const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const User = require("../models/user.model.js");

const createUser = async function (req, res) {
  let { name, email, password } = req.body;

  name = validator.escape(name);
  email = validator.normalizeEmail(email);
  password = validator.escape(password);

  if (await User.findOne({ name }))
    return res
      .status(409)
      .json({ message: "A user with that name already exists" });

  // email = email.toLowerCase();
  // password = bcrypt.hash(password, 10);
};
