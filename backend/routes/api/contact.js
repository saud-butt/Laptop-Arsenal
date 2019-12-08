const express = require("express");
const router = express.Router();

const ContactController = require("../../controllers/contact_controller");

// @route   Post api/contact
// @desc    Create a request
// @access  Public
router.post("/", ContactController.contactUs);

module.exports = router;
