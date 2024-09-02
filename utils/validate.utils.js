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

const isValidDate = function (dateString) {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(dateString)) return false;

  const [day, month, year] = dateString.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
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
  if (!userId || typeof userId !== "string")
    return res.status(401).json({ message: "invalid userId" });

  if (!name || typeof name !== "string")
    return res.status(401).json({ message: "invalid name" });

  if (
    !status ||
    (status !== "pending" &&
      status !== "in-progress" &&
      status !== "completed" &&
      status !== "archived")
  )
    return res.status(401).json({ message: "invalid status value" });

  if (
    !categories ||
    typeof categories !== "string" ||
    (categories !== "work" &&
      categories !== "personal" &&
      categories !== "urgent" &&
      categories !== "others")
  )
    return res.status(401).json({
      message: !categories
        ? "provide category value"
        : "categories value should be a string",
    });

  if (!priority || typeof priority !== "number")
    return res.status(401).json({
      message: !priority
        ? "provide a value for priority"
        : "priority should be a number",
    });

  if (!isValidDate(dueDate))
    return res.status(401).json({ message: "date is invalid" });

  return true;
};

module.exports = {
  validateUserRegisterInput,
  inputValidator,
  taskInputValidator,
};
