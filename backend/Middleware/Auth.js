const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) return res.status(400).json({ msg: "Invalid authorization" });
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) res.json({ msg: "Authorization invalid" });
            req.user = user;
            // console.log(req.user);
            next();
        });
    } catch (error) {
        console.log("Error in auth");
        return res.status(404).json({ msg: error.message });
    }
};

module.exports = auth;
