const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const validateUserRegisterInput = require("../utils/validate.utils.js");
const User = require("../models/user.model.js");

const createUser = async function (req, res) {
  try {
    let { name, email, password } = req.body;

    // sanitize inputs
    name = validator.escape(name);
    email = validator.normalizeEmail(email);
    password = validator.escape(password);

    if (await User.findOne({ name }))
      return res
        .status(409)
        .json({ message: "A user with that name already exists" });

    validateUserRegisterInput(email, password);

    email = email.toLowerCase();
    password = bcrypt.hash(password, 10);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
