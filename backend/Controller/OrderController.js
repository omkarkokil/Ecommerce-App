const Order = require("../Model/OrderModel")
const UserData = require("../Model/UserModal")
const makeOrder = async (req, res) => {
    try {
        const { ShipingInfo,
            OrderData,
            // paymentInfo,
            // itemsPrice,
            taxPrice,
            // shippingPrice,
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
            PaymentType
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
        const orders = await Order.find({ User: req.user.id._id }).populate("OrderData.product", "name price img stock")

        return res.json(orders)
    } catch (error) {
        console.log(error);
    }
}

module.exports = { makeOrder, myOrders }