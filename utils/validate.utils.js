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

  if (name !== undefined) userName = validator.escape(name);
  if (email !== undefined) userEmail = validator.normalizeEmail(email);
  if (password !== undefined) userPassword = validator.escape(password);

  return { userName, userEmail, userPassword };
};

const taskInputValidator = function (
  res,
  userId,
  name,
  status,
  categories,
  priority,
  dueDate
) {
  // validate user inputs
  if (!userId || typeof userId !== Number)
    return res.status(401).json({ message: "invalid userId" });

  if (!name || typeof name !== String)
    return res.status(401).json({ message: "invalid name" });

  if (
    !status ||
    status.toLowerCase() !== "complete" ||
    status.toLowerCase() !== "uncomplete"
  )
    return res.status(401).json({ message: "invalid status value" });

  if (!categories || typeof categories !== String)
    return res.status(401).json({
      message: !categories
        ? "provide category value"
        : "categories value should be a string",
    });

  if (!priority || typeof priority !== Number)
    return res.status(401).json({
      message: !priority
        ? "provide a value for priority"
        : "priority should be a number",
    });

  if (!validator.isDate(dueDate))
    return res.status(401).json({ message: "date is invalid" });
};

module.exports = {
  validateUserRegisterInput,
  inputValidator,
  taskInputValidator,
};
