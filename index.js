require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes/index");
const dbConnection = require("./config/db");
const PORT = process.env.PORT;
const methodOverride = require("method-override"); //metodo put y delete en html
const path = require("path");

//rutas fronted
const apiAuthRoutesFronted = require("./routes/apiAuthRoutesFront");
const apiProductRoutes = require("./routes/apiRoutesFront");

const session = require("express-session"); //importar session

const swaggerUI = require("swagger-ui-express"),
  swaggerDocs = require("./docs/index");

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

app.use("/", routes);

//rutas fronted
app.use("/api", apiAuthRoutesFronted);
app.use("/api", apiProductRoutes);

module.exports = app;
