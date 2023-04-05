const User = require("../Model/UserModal");

const RegisterUser = async (req, res) => {
  const { name, google_id, email, password, userPic } = req.body;
  try {
    const UserExists = await User.findOne({ email });

    if (UserExists) {
      return res
        .status(400)
        .json({ msg: "User already exists", status: false });
    }

    const user = await User.create({
      name,
      email,
      password,
      google_id,
      userPic,
    });

    res
      .status(200)
      .json({ user, msg: "Account created Successfully", status: true });
  } catch (error) {
    console.log(error);
  }
};
function LoginUser(req, res) {
  res.send("Hello boy");
}

module.exports = { RegisterUser, LoginUser };
