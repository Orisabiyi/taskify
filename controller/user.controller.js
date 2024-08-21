const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const validateUserRegisterInput = require("../utils/validate.utils.js");
const User = require("../models/user.model.js");

function inputValidator(name, email, password) {
  let userName, userEmail, userPassword;

  // sanitize inputs
  if (name) userName = validator.escape(name);
  if (email) userEmail = validator.normalizeEmail(email);
  if (password) userPassword = validator.escape(password);

  return { userName, userEmail, userPassword };
}

const createUser = async function (req, res) {
  try {
    let { name, email, password } = req.body;

    let { userName, userEmail, userPassword } = inputValidator(
      name,
      email,
      password
    );

    name = userName;
    email = userEmail;
    password = userPassword;

    if (await User.findOne({ name }))
      return res
        .status(409)
        .json({ message: "A user with that name already exists" });

    if (validateUserRegisterInput(res, email, password) !== true) return;

    email = email.toLowerCase();
    password = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = function (req, res) {
  const { email, password } = req.body;
};

module.exports = { createUser };
