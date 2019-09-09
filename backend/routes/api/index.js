const productRoutes = require("./products");

module.exports = app => {
  app.use("/api/products", productRoutes);
};
