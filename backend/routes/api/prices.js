const express = require("express");
const router = express.Router();

const PricesController = require("../../controllers/prices_controller");

// @route   Post api/prices/processors
// @desc    Post prices of processors
// @access  Public
router.post("/price", PricesController.prices);

// @route   Post api/prices/processors
// @desc    Post prices of processors
// @access  Public
router.post("/processors", PricesController.postProcessorsPrices);

// @route   Post api/prices/graphics
// @desc    Post prices of graphics
// @access  Public
router.post("/graphics", PricesController.postGraphicsPrices);

// @route   Post api/prices/memory
// @desc    Post prices of memory
// @access  Public
router.post("/memory", PricesController.postMemoryPrices);

// @route   Post api/prices/memory
// @desc    Post prices of memory
// @access  Public
router.post("/storage", PricesController.postStoragePrices);

// @route   Get api/prices/processors
// @desc    get prices of processors
// @access  Public
router.get("/processors", PricesController.getProcessorsPrice);

module.exports = router;
