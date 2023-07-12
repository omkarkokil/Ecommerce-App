const Order = require("../Model/OrderModel")
const UserData = require("../Model/UserModal")
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Product = require("../Model/ProductModal");

let Razor_id;
let Razor_order_id;
let Razor_Sign;

const makeOrder = async (req, res) => {
    try {
        const { ShipingInfo,
            OrderData,
            taxPrice,
            totalPrice,
            PaymentType
        } = req.body
        const User = req.user.id._id;

        const order = await Order.create({
            ShipingInfo,
            OrderData,
            User,
            taxPrice,
            totalPrice,
            PaymentType,

        })
        const cart = await UserData.findByIdAndUpdate({ _id: req.user.id._id })
        cart.cartProduct = [];

        await cart.save()

        return res.json({
            status: true,
            msg: "order has been placed successfully",
            order
        })


    } catch (error) {
        console.log(error);
    }
}

const myOrders = async (req, res) => {
    try {
        const orders = await Order.find({ User: req.user.id._id }).populate("OrderData.product", "name price img stock").sort({ createdAt: -1 })
        return res.json(orders)
    } catch (error) {
        console.log(error);
    }
}


const countTotalPriceFromPaidOrders = async () => {
    try {
        const result = await Order.aggregate([
            {
                $match: {
                    PaymentType: "Paid",
                },
            },
            {
                $group: {
                    _id: null,
                    totalPrice: { $sum: "$totalPrice" },
                },
            },
        ]);


        return result[0].totalPrice
    } catch (error) {
        console.error("Error counting total price from paid orders:", error);
        throw error;
    }
};


const countOrdersByCategory = async () => {
    try {
        const result = await Order.aggregate([
            {
                $lookup: {
                    from: "products", // Replace with the actual collection name for products
                    localField: "OrderData.product",
                    foreignField: "_id",
                    as: "productData",
                },
            },
            {
                $unwind: {
                    path: "$productData",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $group: {
                    _id: "$productData.category", // Assuming the product category field is named "category"
                    count: { $sum: 1 },
                },
            },
        ]);


        return result;
    } catch (error) {
        console.error("Error counting orders by category:", error);
        throw error;
    }
};


const getTopPurchasedProducts = async () => {
    try {
        const result = await Order.aggregate([
            {
                $unwind: "$OrderData"
            },
            {
                $group: {
                    _id: "$OrderData.product",
                    totalPurchases: { $sum: "$OrderData.qty" }
                }
            },
            {
                $sort: {
                    totalPurchases: -1
                }
            },
            {
                $limit: 10
            },
            {
                $lookup: {
                    from: "products", // Replace with the actual collection name of your products
                    localField: "_id",
                    foreignField: "_id",
                    as: "productInfo"
                }
            },
            {
                $project: {
                    _id: 1,
                    totalPurchases: 1,
                    productInfo: { $arrayElemAt: ["$productInfo", 0] }
                }
            },
            {
                $project: {
                    _id: 1,
                    totalPurchases: 1,
                    "productInfo.name": 1,
                    "productInfo.img": 1,
                    "productInfo.price": 1,
                    "productInfo.stock": 1,
                    "productInfo.desc": 1,
                    "productInfo._id": 1,
                    "productInfo.avgrate": 1,
                }
            }
        ]);
        return result;
    } catch (error) {
        console.error('Error retrieving top purchased products:', error);
        throw error;
    }
};


const getOverallOrdersLastFiveMonths = async () => {
    try {
        // Calculate the date 5 months ago
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const monthsData = [];

        // Loop through each month up to the last 5 months
        for (let i = 0; i < 5; i++) {
            const currentMonth = currentDate.getMonth();

            const currentYear = currentDate.getFullYear();
            const startOfMonth = new Date(currentYear, currentMonth, 1);
            const endOfMonth = new Date(currentYear, currentMonth + 1);

            console.log(startOfMonth, endOfMonth, "hii");

            // Aggregate and count orders for the current month
            const orderCount = await Order.countDocuments({
                createdAt: { $gte: startOfMonth, $lte: endOfMonth },
            });

            // Store the month and its corresponding order count
            const monthData = {
                month: currentMonth,
                year: currentYear,
                orderCount: orderCount,
            };
            monthsData.push(monthData);

            // Move to the previous month
            currentDate.setMonth(currentMonth - 1);
        }

        return monthsData;
    } catch (error) {
        // Handle error
        console.error('Error fetching overall product purchases:', error);
        throw error;
    }
}





const getAllOrders = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const size = 10;
        const skip = (page - 1) * size
        const allOrders = await Order.find().select(["-paymentInfo"]).skip(skip).limit(size).sort({ createdAt: "-1" });
        const count = await Order.countDocuments();
        const totalEarnings = await countTotalPriceFromPaidOrders()
        const totalCategoryBuy = await countOrdersByCategory()
        const topPurchases = await getTopPurchasedProducts()

        // const data = await getOverallOrdersLastFiveMonths();

        // console.log(data);

        return res.json({ orders: allOrders, count: count, totalEarnings, totalCategoryBuy, topPurchases })
    } catch (error) {
        console.log(error);
    }
}

const getOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id).populate("User", "name").populate("OrderData.product", "name img price")

        return res.json(order)
    } catch (error) {
        console.log(error);
    }
}



const CheckOut = async (req, res) => {
    try {
        const instance = new Razorpay({ key_id: process.env.RAZOR_PAY_KEY, key_secret: process.env.RAZOR_PAY_SECRET })
        const options = {
            amount: req.body.amount * 100,
            currency: "INR",
        };

        const order = await instance.orders.create(options)
        return res.json({
            success: true,
            order,
        })
    } catch (error) {
        console.log(error);
    }
}



const verifyPayment = async (req, res) => {
    const { ShipingInfo,
        OrderData,
        taxPrice,
        totalPrice,
        PaymentType,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,

    } = req.body;

    const payment = {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZOR_PAY_SECRET)
        .update(body.toString())
        .digest("hex");


    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        const User = req.user.id._id;
        const order = await Order.create({
            ShipingInfo,
            OrderData,
            User,
            taxPrice,
            totalPrice,
            PaymentType,
            paymentInfo: payment
        })
        const cart = await UserData.findByIdAndUpdate({ _id: req.user.id._id })
        cart.cartProduct = [];

        await cart.save()

        return res.json({ success: true, msg: "Order created successfully" })
    } else {
        res.status(400).json({
            success: false,
        });
    }
}


const UpdateOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)

        if (order.orderStatus === "Delivered") {
            return res.json({
                success: false,
                msg: "Order has been already delivered"
            })
        }

        if (req.body.orderStatus === "Shipped") {
            order.OrderData.forEach(async (i) => {
                await UpdateStock(i.product, i.qty)
            });
        }

        if (req.body.orderStatus === "Delivered") {
            order.PaymentType = "Paid"
            order.deliveredAt = Date.now()
        }

        order.orderStatus = req.body.orderStatus
        await order.save()

        return res.json({
            success: true,
            msg: "Order Updated Successfully"
        })
    } catch (error) {
        console.log(error);
    }
}


const UpdateStock = async (id, qty) => {
    const product = await Product.findById(id)
    product.stock -= qty
    await product.save()
}




module.exports = { makeOrder, myOrders, CheckOut, verifyPayment, getAllOrders, getOrder, UpdateOrder }