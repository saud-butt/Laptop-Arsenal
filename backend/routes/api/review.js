const express = require("express");
const router = express.Router();
const passport = require("passport");

const ReviewController = require("../../controllers/review_controller");

// @route   GET api/reviews
// @desc    Get all reviews
// @access  Public
router.get("", ReviewController.getAllReviews);

// @route   GET api/reviews/:id
// @desc    Get review by id
// @access  Public
router.get("/:id", ReviewController.getReview);

// @route   GET api/reviews/:user_id
// @desc    Get review by user_id
// @access  Public
router.get("/user/:id", ReviewController.getReviewByUserId);

// Get review by name
// GET /api/reviews/name/:reviewName
router.get("/name/:name", ReviewController.getReviewByName);

// @route   GET api/reviews/:product_id
// @desc    Get review by product_id
// @access  Public
router.get("/model/:id", ReviewController.getReviewByProductId);

// @route   Post api/reviews
// @desc    Create review
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  ReviewController.createReview
);

// @route   DELETE api/reviews/:id
// @desc    Delete Review
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  ReviewController.deleteReview
);

// @route   POST api/reviews/like/:id
// @desc    Like review
// @access  Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  ReviewController.likeReview
);

// @route   POST api/reviews/unlike/:id
// @desc    Unlike review
// @access  Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  ReviewController.unlikeReview
);

// @route   POST api/reviews/comment/:id
// @desc    Add comment to review
// @access  Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  ReviewController.commentOnReview
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from review
// @access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  ReviewController.deleteComment
);

module.exports = router;
