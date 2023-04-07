const mongoose = require("mongoose");

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
});

const UserModal = mongoose.model("users", UserSchema);

module.exports = UserModal;
