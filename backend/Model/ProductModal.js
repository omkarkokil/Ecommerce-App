const mongoose = require("mongoose");
const User = require("../Model/UserModal")

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        default: "No description for this product"
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: Array
    },
    category: {
        type: String,
        enum: ["Top",
            "Bottom",
            "attire",
            "Appliances",
            "electronics",
            "Laptop & tech"],
        required: true
    },
    stock: {
        type: Number,
        required: true,
        maxLength: 4,
        default: 1
    },
    reviews: [
        {
            userid: {
                type: mongoose.Schema.Types.ObjectId,
                ref: User
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const productModal = mongoose.model("product", ProductSchema);

module.exports = productModal;