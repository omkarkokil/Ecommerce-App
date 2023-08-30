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


const countStockByCategory = async () => {
    try {
        const result = await Product.aggregate([
            {
                $group: {
                    _id: '$category',
                    totalProducts: { $sum: 1 }
                }
            }
        ]);
        return result;
    } catch (error) {
        console.error("Error counting orders by category:", error);
        throw error;
    }
};


const getAllProducts = async (req, res) => {
    try {
        const search = req.query.search ? req.query.search : ""
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const size = req.query.size ? parseInt(req.query.size) : 15;

        const skip = (page - 1) * size;
        const products = await Product.find().sort({ createdAt: -1 }).skip(skip).limit(size)

        const searchproduct = products.filter((item) => {
            return item.name.toLowerCase().includes(search)
        })

        const total = await Product.find();
        const searchTotal = total.filter((item) => {
            if (item.name.toLowerCase().includes(search)) {
                return item
            }
        })

        const Inventory = await countStockByCategory()


        if (!search || search !== null) {
            return res.json({ products: searchproduct, page, size, total: searchTotal.length, Inventory })
        } else {
            return res.json({ products, page, size, total: total.length, Inventory })
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
        let getRate = avg / product.reviews.length;

        await Product.findByIdAndUpdate(productid, { avgrate: getRate.toFixed(1) })

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


const editProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { name, price, img, stock, desc, category } = req.body

        await Product.findByIdAndUpdate({ _id: id }, { name, price, img, stock, desc, category });

        return res.json({
            success: true,
            msg: "Product updated successfully"
        })

    } catch (error) {
        if (error) {
            console.log(error);
            return res.json({
                success: false,
                msg: "Server error please try again"
            })
        }
    }
}



const deleteProduct = async (req, res) => {
    try {
        const { id } = req.query
        await Product.findByIdAndDelete({ _id: id })

        return res.json({
            msg: "Product deleted successfully",
            status: true
        })


    } catch (error) {
        console.log(error);
        return res.json({
            msg: "Server has an error please try later",
            status: false
        })
    }
}

module.exports = { createProduct, getAllProducts, getProduct, createReviews, getComments, deleteProduct, editProduct };