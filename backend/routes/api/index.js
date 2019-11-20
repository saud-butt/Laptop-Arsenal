const productRoutes = require("./products");
const reviewRoutes = require("./review");
const userRoutes = require("./users");

module.exports = app => {
  app.use("/api/products", productRoutes);
  app.use("/api/reviews", reviewRoutes);
  app.use("/api/users", userRoutes);
};
