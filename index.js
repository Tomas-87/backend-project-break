require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes/index"); //modificar la ruta si es necesario
const dbConnection = require("./config/db");
const PORT = process.env.PORT;
const methodOverride = require("method-override"); //metodo put y delete en html
const path = require("path");

app.use(methodOverride("_method"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", routes);

module.exports = app;
