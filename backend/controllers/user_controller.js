const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const keys = require("../../config/keys_dev");
const User = require("../models/users");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

exports.registerUser = (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
        wishlist: []
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
};

exports.loginUser = (req, res, next) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
};

exports.getCurrentUser = (req, res, next) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
};

exports.addToWishlist = (req, res, next) => {
  User.findOne({ _id: req.user.id })
    .then(user => {
      const newitem = req.params.id;
      // Add to wishlist array
      user.wishlist.unshift(newitem);
      user.save().then(updatedUser => res.json(updatedUser));
    })
    .catch(err => res.status(404).json(err));
};

exports.getWishlist = (req, res, next) => {
  User.findOne({ _id: req.user.id })
    .then(
      res.json({
        wishlist: req.user.wishlist
      })
    )
    .catch(err => res.status(500).json({ err }));
};

exports.removeFromWishlist = (req, res, next) => {
  User.findOne({ _id: req.user.id })
    .then(user => {
      //Remove from wishlist
      user.wishlist = user.wishlist.filter(item => `${item}` !== req.params.id);
      user.save().then(updatedUser => res.json(updatedUser));
    })
    .catch(err => res.status(404).json(err));
};
