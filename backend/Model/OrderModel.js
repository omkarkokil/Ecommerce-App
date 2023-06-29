const mongoose = require("mongoose")
const UserModal = require("./UserModal")
const productModal = require("./ProductModal")

const OrderSchema = mongoose.Schema({
    ShipingInfo: {
        address: {
            type: String,
        },
        State: {
            type: String,
        },
        mob: {
            type: Number,
        },
        pincode: {
            type: Number,
        }
    },
    OrderData: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: productModal,
                required: true,
            },
            qty: {
                type: Number,
                required: true
            },
        }
    ],
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModal,
    },
    paymentInfo: {
        razorpay_order_id: {
            type: String,
        },
        razorpay_payment_id: {
            type: String,
        },
        razorpay_signature: {
            type: String,
        },
    },
    paidAt: {
        type: Date,
    },

    taxPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    PaymentType: {
        type: String,
        enum: ["Not Paid", "Paid"],
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Processing",
        enum: ["Processing", "Shipped", "Delivered"]
    },
    deliveredAt: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
})


const OrderModel = mongoose.model("orders", OrderSchema);

module.exports = OrderModel;