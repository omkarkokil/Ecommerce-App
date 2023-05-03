const express = require("express");

const cors = require("cors");

const userRouter = require("./Routes/UserRoutes");
const productRouter = require("./Routes/ProductRoute")
const orderRouter = require("./Routes/OrderRoute")
require("dotenv").config();
require("./DBconnect");

const app = express();
app.use(express.json());
app.use(cors({ credentials: true }));
app.use("/api/auth", userRouter);
app.use("/api/product", productRouter)
app.use("/api/order", orderRouter)

app.listen(process.env.PORT, () => {
  console.log("Running on port 5000");
});
