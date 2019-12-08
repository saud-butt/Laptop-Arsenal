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

// @route   Get api/prices/processors
// @desc    get prices of processors
// @access  Public
router.get("/processors", PricesController.getProcessorsPrice);

module.exports = router;
