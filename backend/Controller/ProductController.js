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
        const search = req.query.search ? req.query.search : ""
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const size = req.query.size ? parseInt(req.query.size) : 15;

        const skip = (page - 1) * size;
        const products = await Product.find().sort({ createdAt: -1 }).skip(skip).limit(15)

        const searchproduct = products.filter((item) => {
            return item.name.toLowerCase().includes(search) || item.category.toLowerCase().includes(search)
        })

        const total = await Product.find();
        const searchTotal = total.filter((item) => {
            if (item.name.toLowerCase().includes(search) || item.category.toLowerCase().includes(search)) {
                return item
            }
        })

        if (!search || search !== null) {
            return res.json({ products: searchproduct, page, size, total: searchTotal.length })
        } else {
            return res.json({ products, page, size, total: total.length })
        }

    } catch (error) {
        console.log(error);
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

        const product = await Product.findById(productid);

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

        let avg = 0
        product.reviews.forEach((element) => {
            avg += element.rating
        })
        console.log(avg);
        let getRate = avg / product.reviews.length;

        await Product.findByIdAndUpdate(productid, { avgrate: getRate.toFixed(1) })
        console.log(getRate);

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
            product: product.reviews,

        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { createProduct, getAllProducts, getProduct, createReviews, getComments };