const express = require("express");
const mongoose = require("mongoose");
process.loadEnvFile(".env");

const app = express();
app.use(express.json());

app.get("/", () => console.log("Server Running in Port 3000"));
app.listen(3000);

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Database is connected Successfully"))
  .catch((error) => console.log(error.message));
