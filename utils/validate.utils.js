const validator = require("validator");

const validateUserRegisterInput = function (email, password) {
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
};
