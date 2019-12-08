const Contact = require("../models/contact");

// Validation
const validateReviewInput = require("../validation/review");

// Create a request
exports.contactUs = (req, res) => {
  const { errors, isValid } = validateReviewInput(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  const newContact = new Contact({
    text: req.body.text,
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject
  });

  newContact.save().then(Contact => res.json(Contact));
};
