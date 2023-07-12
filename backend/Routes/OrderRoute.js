const express = require("express");

const { makeOrder, myOrders, CheckOut, verifyPayment, getAllOrders, getOrder, UpdateOrder } = require("../Controller/OrderController")
const Auth = require("../Middleware/Auth")

const router = express.Router();

router.post("/makeOrder", Auth, makeOrder);
router.get("/myOrders", Auth, myOrders);
router.post("/checkout", CheckOut)
router.post("/verifyPayment", Auth, verifyPayment)
router.get("/getAllOrders", getAllOrders)
router.get("/getOrder/:id", getOrder)
router.put("/UpdateOrder/:id", UpdateOrder)


module.exports = router;