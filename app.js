// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalize = require("./utils/capitalize");
const projectName = "jcommerce";

app.locals.appTitle = `${projectName}`;

app.get("/admin/login", (req, res) => {
  res.render("admin/login", { hideNavbar: true });
});

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const favoritesRoutes = require("./routes/favorites.routes");
app.use("/", favoritesRoutes);

const productsRoutes = require("./routes/products.routes");
app.use("/", productsRoutes);

const purchasesRoutes = require("./routes/purchases.routes");
app.use("/", purchasesRoutes);

const adminRoutes = require("./routes/admin.routes");
app.use("/", adminRoutes);

// If you change this route from /carts to / it is not working !!!
const cartRoutes = require("./routes/carts.routes");
app.use("/carts", cartRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
