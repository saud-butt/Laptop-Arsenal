const productRoutes = require("./products");
const reviewRoutes = require("./review");
const userRoutes = require("./users");
const contactRoutes = require("./contact");
const pricesRoutes = require("./prices");

module.exports = app => {
  app.use("/api/products", productRoutes);
  app.use("/api/reviews", reviewRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/contact", contactRoutes);
  app.use("/api/prices", pricesRoutes);
};
