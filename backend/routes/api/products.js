const express = require("express");
const router = express.Router();

const ProductsController = require("../../controllers/products_controller");

// Get all products
// GET /api/products
router.get("", ProductsController.getAllProducts);

// Get product by Id
// GET /api/products/:productId
router.get("/:productId", ProductsController.getProductsById);

// Get products by brand
// GET /api/products/related/:productBrand
router.get("/brand/:brand", ProductsController.getRelatedProduct);

// Get product by name
// GET /api/products/name/:productName
router.get("/name/:name", ProductsController.getProductByName);

// Get product by memory
// GET /api/products/memory/:productMemory
//router.get("/memory/:memory", ProductsController.getProductsByMemory);

// Get products by category
// GET /api/products/category/:categoryName
router.get("/category/:category", ProductsController.getProductsByCategory);

// Get products by memory
// GET /api.products/memory/:MemoryValue
//router.get("/memory/:memory", ProductsController.getProductsByMemory);

// Filter Products
// GET /api/products/filters?filters={}
router.get("/filters/apply", ProductsController.filterProducts);

module.exports = router;
