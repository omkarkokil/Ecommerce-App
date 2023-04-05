const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
  },
  google_id: {
    type: String,
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
  },
});

const UserModal = mongoose.model("users", UserSchema);

module.exports = UserModal;
