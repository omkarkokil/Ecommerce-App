const express = require("express")
const router = express.Router();
const Auth = require("../Middleware/Auth")
const { createProduct, getAllProducts, getProduct, createReviews, getComments, deleteProduct, editProduct } = require("../Controller/ProductController")
router.post("/createproduct", createProduct);
router.get("/getAllproducts", getAllProducts)
router.get("/getProduct/:id", getProduct)
router.put("/createCommment", Auth, createReviews)
router.get("/getComments/:id", getComments);
router.put("/editProduct/:id", editProduct);
router.delete("/deleteProduct", deleteProduct);


module.exports = router