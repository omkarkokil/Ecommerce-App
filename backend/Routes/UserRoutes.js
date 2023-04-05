const express = require("express");
const router = express.Router();
const { RegisterUser } = require("../Controller/UserController");

router.post("/registeruser", RegisterUser);

module.exports = router;
