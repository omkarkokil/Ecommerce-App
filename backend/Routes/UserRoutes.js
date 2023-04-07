const express = require("express");
const router = express.Router();
const {
  RegisterUser,
  LoginUser,
  googleUser,
} = require("../Controller/UserController");

router.post("/registeruser", RegisterUser);
router.post("/loginuser", LoginUser);
router.post("/googleAuth", googleUser);

module.exports = router;
