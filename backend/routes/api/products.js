const express = require("express");
const router = express.Router();

const ProductsController = require("../../controllers/products_controller");

// Get all products
// GET /api/products
router.get("", ProductsController.getAllProducts);

// Get product by Id
// GET /api/products/:productId
router.get("/:productId", ProductsController.getProductsById);

// Get product by brand
// GET /api/products/:productBrand
router.get("/brand/:brand", ProductsController.getRelatedProduct);

// Get product by name
// GET /api/products/:productName
router.get("/name/:name", ProductsController.getProductByName);

// Filter Products
// GET /api/products/filters?filters={}
router.get("/filters/apply", ProductsController.filterProducts);

module.exports = router;
