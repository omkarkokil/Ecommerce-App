const Order = require("../Model/OrderModel")
const UserData = require("../Model/UserModal")
const Razorpay = require('razorpay');
const crypto = require('crypto')


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

    } =
        req.body;

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




module.exports = { makeOrder, myOrders, CheckOut, verifyPayment }