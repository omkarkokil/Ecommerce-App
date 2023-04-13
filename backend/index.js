const express = require("express");
const cors = require("cors");

const userRouter = require("./Routes/UserRoutes");
const productRouter = require("./Routes/ProductRoute")
require("dotenv").config();
require("./DBconnect");

const app = express();
app.use(express.json());
app.use(cors({ credentials: true }));
app.use("/api/auth", userRouter);
app.use("/api/product", productRouter)

app.listen(process.env.PORT, () => {
  console.log("Running on port 5000");
});
