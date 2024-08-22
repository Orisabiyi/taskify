const validator = require("validator");

const validateUserRegisterInput = function (res, email, password) {
  if (!validator.isEmail(email))
    return res.status(400).json({ message: "The email provided is not valid" });

  if (!validator.isLength(password, { min: 8 }))
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters" });

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
    return res.status(400).json({
      message: "Password must contain at least one special character",
    });

  return true;
};

const inputValidator = function (name, email, password) {
  let userName, userEmail, userPassword;

  if (name) userName = validator.escape(name);
  if (email) userEmail = validator.normalizeEmail(email);
  if (password) userPassword = validator.escape(password);

  return { userName, userEmail, userPassword };
};

module.exports = {
  validateUserRegisterInput,
  inputValidator,
};
