const express = require("express");
const router = express.Router();
const Auth = require("../Middleware/Auth")
const {
  RegisterUser,
  LoginUser,
  googleUser,
  getAllUser,
  deleteUser,
  AddToCart,
  getCart,
  removeCart
} = require("../Controller/UserController");

router.post("/registeruser", RegisterUser);
router.post("/loginuser", LoginUser);
router.post("/googleAuth", googleUser);
router.get("/getallusers", Auth, getAllUser);
router.delete("/deleteuser/:id", Auth, deleteUser);
router.post("/addtocart", Auth, AddToCart)
router.put("/removecart", Auth, removeCart)
router.get("/getcart", Auth, getCart)

module.exports = router;
