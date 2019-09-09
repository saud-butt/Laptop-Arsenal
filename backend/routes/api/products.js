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
// GET /api.products/:productBrand
router.get("/brand/:brand", ProductsController.getRelatedProduct);

module.exports = router;
