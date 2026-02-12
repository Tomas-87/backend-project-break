require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes/index"); //modificar la ruta si es necesario
const dbConnection = require("./config/db");
const PORT = process.env.PORT;
const methodOverride = require("method-override"); //metodo put y delete en html
const path = require("path");

const session = require("express-session"); //importar session

const swaggerUI = require("swagger-ui-express"),
  swaggerDocs = require("./docs/index");

const authRoutes = require("./routes/authRoutes");

app.use(methodOverride("_method"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//sesiones de login
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use("/api_docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use("/", authRoutes);

app.use("/", routes);

//fronted
const apiProductRoutes = require("./routes/apiRoutesFront");
app.use("/api", apiProductRoutes);

module.exports = app;
