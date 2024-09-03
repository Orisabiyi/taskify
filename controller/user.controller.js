const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const {
  inputValidator,
  validateUserRegisterInput,
} = require("../utils/validate.utils.js");
const User = require("../models/user.model.js");

const createUser = async function (req, res) {
  try {
    let { name, email, password } = req.body;

    // sanitize inputs
    const { userName, userEmail, userPassword } = inputValidator(
      name,
      email,
      password
    );

    name = userName;
    email = userEmail;
    password = userPassword;

    if ((await User.findOne({ name })) || (await User.findOne({ email })))
      return res.status(409).json({ message: "A user already exists" });

    if (validateUserRegisterInput(res, email, password) !== true) return;

    email = email.toLowerCase();
    password = await bcrypt.hash(password, 10);

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const user = await User.create({ name, email, password, refreshToken });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async function (req, res) {
  try {
    let { email, password } = req.body;

    // sanitize input
    const { userEmail, userPassword } = inputValidator(
      undefined,
      email,
      password
    );
    email = userEmail;
    password = userPassword;

    const user = await User.findOne({ email });

    if (!user) return res.status(409).json({ message: "user not found " });

    if (!(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createUser, loginUser };
