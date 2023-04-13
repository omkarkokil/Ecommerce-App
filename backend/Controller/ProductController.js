const Product = require("../Model/ProductModal")

const createProduct = async (req, res) => {
    try {
        const { name, desc, price, img, category, stock } = req.body

        const product = await Product.create({
            name,
            desc,
            price,
            img,
            category,
            stock
        })

        return res.json({
            status: true,
            msg: "product created successfully",
            product
        })
    } catch (error) {
        console.log(error);
        return res.json(error)
    }
}

const getAllProducts = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const size = req.query.size ? parseInt(req.query.size) : 15;

        const skip = (page - 1) * size;
        const total = await Product.countDocuments();
        const products = await Product.find().limit(size).skip(skip).sort({ _id: -1 });
        return res.json({ products, page, size, total })

    } catch (error) {
        return res.json({ msg: error, status: false });
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({ _id: id })
        return res.json(product)
    } catch (error) {
        console.log(error);
    }
}

const createReviews = async (req, res) => {
    try {
        const { comment, rating, productid } = req.body;


        const review =
        {
            userid: req.user.id._id,
            name: req.user.id.name,
            rating,
            comment
        }

        const product = await Product.findById(productid)

        const reviewExists = product.reviews.find((ifExists) => ifExists.userid !== undefined ? ifExists.userid.toString() === review.userid.toString() : "")


        if (reviewExists) {
            product.reviews.forEach(element => {
                if (element.userid !== undefined) {

                    if (element.userid.toString() === review.userid.toString()) {
                        element.rating = review.rating
                        element.comment = review.comment
                    }
                }
            });
        } else {
            product.reviews.push(review)
        }

        const data = await product.save({ validateBeforeSave: false });



        return res.json({
            status: true,
            msg: "reviewd succssfully",
            data,
        })
    } catch (error) {
        console.log(error);
    }
}


const getComments = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)

        return res.json({
            status: true,
            product: product.reviews
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { createProduct, getAllProducts, getProduct, createReviews, getComments };