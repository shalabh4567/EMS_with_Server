const express = require("express");
require("dotenv").config();
console.log(process.env.MONGO_URI);
const database = require("./database/database");
database.connect();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const v1 = "/api/v1";

const user = require("./routes/user");

app.use(v1, user);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
