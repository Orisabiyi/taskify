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
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    const user = await User.create({ name, email, password, refreshToken });

    res.status(201).json({ token, refreshToken });
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

    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(409).json({ message: "Invalid email or password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ token, refreshToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const refreshToken = async function (req, res) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken)
      return res.status(401).json({ message: "Refresh token is required" });

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.refreshToken !== refreshToken)
      return res.status(403).json({ message: "Invalid refresh token" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const newRefreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    user.refreshToken = newRefreshToken;
    await user.save();

    res.status(200).json({ token, refreshToken: newRefreshToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const profile = async function (req, res) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token is required" });

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // find a user based on jwt and excluding the password
    const user = User.findById(decode.userId).select("-password");

    if (!user) return res.status(400).json({ message: "Invalid token" });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createUser, loginUser, refreshToken, profile };
