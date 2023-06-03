const User = require("../Model/UserModal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const productModal = require("../Model/ProductModal");



const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

const RegisterUser = async (req, res) => {
  const { name, google_id, email, password, userPic } = req.body;

  try {
    const UserExists = await User.findOne({ email });

    if (UserExists) {
      return res.json({ msg: "User already exists", status: false });
    }

    if ((!name, !password, !email)) {
      return res.json({ msg: "Name , email & password are mandatory", status: false });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hash,
      google_id,
      userPic,
    });
    delete User.password;

    const Jsontoken = await User.findOne({ email }).select(["-password"]);

    res.status(202).json({
      user,
      msg: "Account created Successfully",
      status: true,
      token: generateToken(Jsontoken),
    });
  } catch (error) {
    console.log(error);
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ msg: "Invalid credentails", status: false });
    }

    const matchPass = await bcrypt.compare(password, user.password);

    if (!matchPass) {
      return res.json({ msg: "Invalid credentails", status: false });
    }

    const afterAuth = await User.findOne({ email }).select("-password");

    if (user.isAdmin === 1) {
      return res.status(202).json({
        msg: "login successful",
        status: true,
        isAdminStatus: true,
        user,
        token: generateToken(afterAuth),
        isAuth: generateToken(user.isAdmin),
      });
    }

    return res.status(202).json({
      msg: "login successful",
      status: true,
      isAdminStatus: false,
      user,
      token: generateToken(afterAuth),
    });
  } catch (error) {
    console.log(error);
  }
};

const googleUser = async (req, res) => {
  try {
    const { email, sub, name, picture } = req.body;
    const userexists = await User.findOne({ email });

    if (!userexists) {
      const user = await User.create({
        name,
        email,
        google_id: sub,
        userPic: picture,
      });

      return res.status(200).json({
        user,
        msg: "Account created Successfully",
        status: true,
        token: generateToken(user),
      });
    }

    return res.status(202).json({
      msg: "login successful",
      status: true,
      userexists,
      token: generateToken(userexists),
    });
  } catch (error) {
    console.log(error);
  }
};


const getAllUser = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const size = req.query.size ? parseInt(req.query.size) : 5;

    const skip = (page - 1) * size;

    const total = await User.countDocuments();
    const users = await User.find({ _id: { $nin: req.user.id._id } }).select(["-password"]).skip(skip).limit(size);
    return res.json({
      users,
      total,
      page,
      size,
      status: true
    })
  } catch (error) {
    console.log(error);
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteuser = await User.findByIdAndDelete({ _id: id });

    return res.json({
      msg: "User deleted successfully",
      status: true,
      deleteuser
    })
  } catch (error) {
    console.log(error);
  }
}

const AddToCart = async (req, res) => {
  try {
    const { qty, productid } = req.body;
    const product = { productid, qty }
    const user = await User.findOne({ _id: req.user.id._id })
    const productExists = user.cartProduct.find((item) =>
      item.productid.toString() !== undefined ? item.productid.toString() === product.productid : "",
    )

    if (productExists) {
      user.cartProduct.forEach(item => {
        if (item.productid.toString() !== undefined) {
          if (item.productid.toString() === product.productid) {
            item.qty += product.qty
          }
        }
      });

    } else {
      user.cartProduct.push(product)
    }

    await user.save({ validateBeforeSave: false })

    return res.json({
      msg: "Product added to cart",
      data: product,
      status: true
    })

  } catch (error) {
    console.log(error);
  }
}




const removeCart = async (req, res) => {
  try {
    const { id } = req.body
    const data = await User.findByIdAndUpdate({ _id: req.user.id._id })
    const product = data.cartProduct.filter((item) => {
      return item.productid != id
    }
    )
    data.cartProduct = product;

    await data.save()

    return res.json({
      status: true,
      product,
      msg: "Product removed from cart"
    })

  } catch (error) {
    console.log(error);
  }
}

const getCart = async (req, res) => {
  try {
    const { _id } = req.user.id;
    const user = await User.findOne({ _id }).populate("cartProduct.productid", "name  price img stock")
    return res.json({
      status: true,
      cartProduct: user.cartProduct
    })

  } catch (error) {
    console.log(error);
  }
}


module.exports = { RegisterUser, LoginUser, googleUser, getAllUser, deleteUser, AddToCart, removeCart, getCart };
