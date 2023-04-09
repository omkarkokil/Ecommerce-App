const express = require("express");
const router = express.Router();
const Auth = require("../Middleware/Auth")
const {
  RegisterUser,
  LoginUser,
  googleUser,
  getAllUser,
  deleteUser
} = require("../Controller/UserController");

router.post("/registeruser", RegisterUser);
router.post("/loginuser", LoginUser);
router.post("/googleAuth", googleUser);
router.get("/getallusers", Auth, getAllUser);
router.delete("/deleteuser/:id", Auth, deleteUser);

module.exports = router;
