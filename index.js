const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

app.get("/", () => console.log("Server Running in Port 3000"));
app.listen(3000);
