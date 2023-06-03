const express = require("express");

const Razorpay = require('razorpay');
const cors = require("cors");

const userRouter = require("./Routes/UserRoutes");
const productRouter = require("./Routes/ProductRoute")
const orderRouter = require("./Routes/OrderRoute")
require("dotenv").config();
require("./DBconnect");



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true }));
app.use("/api/auth", userRouter);
app.use("/api/product", productRouter)
app.use("/api/order", orderRouter)




app.get("/api/order/getKey", (req, res) => {
  return res.status(200).json({ key: process.env.RAZOR_PAY_KEY })
})

app.listen(process.env.PORT, () => {
  console.log("Running on port 5000");
});
