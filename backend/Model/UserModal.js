const mongoose = require("mongoose");
const Product = require("./ProductModal");



const UserSchema = mongoose.Schema({
  name: {
    type: String,
  },
  google_id: {
    type: String,
  },
  isAdmin: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  userPic: {
    type: String,
    default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
  cartProduct: [{
    productid: {
      type: mongoose.Types.ObjectId,
      ref: Product,
    },
    qty: {
      type: Number,
      default: 1
    }
  }
  ],
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const UserModal = mongoose.model("users", UserSchema);

module.exports = UserModal;
