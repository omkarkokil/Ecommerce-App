const express = require("express");

const { makeOrder, myOrders, CheckOut, verifyPayment } = require("../Controller/OrderController")
const Auth = require("../Middleware/Auth")

const router = express.Router();

router.post("/makeOrder", Auth, makeOrder);
router.get("/myOrders", Auth, myOrders);
router.post("/checkout", CheckOut)
router.post("/verifyPayment", Auth, verifyPayment)


module.exports = router;