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
        required: true,
    },
    paymentInfo: {
        id: {
            type: String,
        },
        status: {
            type: String,

        },
    },
    paidAt: {
        type: Date,
    },
    // itemsPrice: {
    //     type: Number,
    //     required: true,
    //     default: 0,
    // },
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
        enum: ["cash on delivery", "card"],
        default: "cash on delivery"
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Processing",
    },
    deliveredAt: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
})


const OrderModel = mongoose.model("orders", OrderSchema);

module.exports = OrderModel;