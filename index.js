const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user.route.js");
const taskRoute = require("./routes/task.route.js");
const authenticateToken = require("./middleware/auth.middleware.js");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

app.use("/api/v1/auth", userRoute);

// Protected route
app.use("/api/v1/task", authenticateToken, taskRoute);

app.get("/", (_, res) => res.send("Welcome to taskify api"));

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Database is connected Successfully");
    app.listen(3000, () => console.log("Server is running at port 3000"));
  })
  .catch((error) => console.log(error.message));
