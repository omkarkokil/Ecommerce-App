const express = require("express");

const { makeOrder, myOrders } = require("../Controller/OrderController")
const Auth = require("../Middleware/Auth")

const router = express.Router();

router.post("/makeOrder", Auth, makeOrder);
router.get("/myOrders", Auth, myOrders);


module.exports = router;