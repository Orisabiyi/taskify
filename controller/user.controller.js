const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const User = require("../models/user.model.js");

const createUser = async function (req, res) {
  let { name, email, password } = req.body;

  // name = validator.escape(name);

  if (await User.findOne({ name }))
    return res
      .status(409)
      .json({ message: "A user with that name already exists" });

  if (!validator.isEmail(email))
    res.status(409).json({ message: "The email provided is not valid" });

  if (!validator.isLength(password, { min: 8 }))
    return res
      .status(409)
      .json({ message: "Password must be at least 8 characters" });

  if (!validator.isAlphanumeric(password))
    res
      .status(409)
      .json({ message: "Password must contain only numbers and letters" });

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
    return res.status(409).json({
      message: "Password must contain at least one special character",
    });

  // email = email.toLowerCase();
  // password = bcrypt.hash(password, 10);
};
