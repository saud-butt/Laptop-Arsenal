const express = require("express");
const router = express.Router();
const passport = require("passport");

const UserController = require("../../controllers/user_controller");

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post("/register", UserController.registerUser);

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/login", UserController.loginUser);

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  UserController.getCurrentUser
);

// @route   POST
// @desc    Add product to wishlist
// @access  Private
router.post(
  "/wishlist/:id",
  passport.authenticate("jwt", { session: false }),
  UserController.addToWishlist
);
// @route   GET
// @desc    get wishlist of user
// @access  Private
router.get(
  "/wishlist",
  passport.authenticate("jwt", { session: false }),
  UserController.getWishlist
);

// @route   DELETE
// @desc    Delete product from wishlist
// @access  Private
router.delete(
  "/wishlist/:id",
  passport.authenticate("jwt", { session: false }),
  UserController.removeFromWishlist
);

module.exports = router;
