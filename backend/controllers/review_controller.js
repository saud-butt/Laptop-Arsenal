const Review = require("../models/review");
const User = require("../models/users");

// Validation
const validateReviewInput = require("../validation/review");

// Get all Reviews
exports.getAllReviews = (req, res, next) => {
  const errors = {};
  const page = req.query.page;
  const limit = req.query.limit;
  const options = {
    page: page,
    limit: limit
  };

  Review.paginate({}, options, function(err, reviews) {
    if (!reviews) {
      errors.noreview = "There are no reviews";
      return res.status(404).json(errors);
    }
    res.json(res.json(reviews));
  }).catch(err =>
    res.status(404).json({ noreviewsfound: "No review found end" })
  );

  // Review.find()
  //   .sort({ date: -1 })
  //   .then(reviews => res.json(reviews))
  //   .catch(err => res.status(404).json({ noreviewsfound: "No review found" }));
};

// Get Review by Id
exports.getReview = (req, res) => {
  Review.findById(req.params.id)
    .then(review => res.json(review))
    .catch(err =>
      res.status(404).json({ noreviewfound: "No review found with that ID" })
    );
};

// Get Reviews by UserId
exports.getReviewByUserId = (req, res) => {
  Review.find({ user: req.params.id })
    .then(review => res.json(review))
    .catch(err =>
      res.status(404).json({ noreviewfound: "No review found for this user" })
    );
};

// Get Review by ProductId
exports.getReviewByProductId = (req, res) => {
  Review.find({ product: req.params.id })
    .then(review => res.json(review))
    .catch(err =>
      res
        .status(404)
        .json({ noreviewfound: "No review found for this product" })
    );
};

// Create a review
exports.createReview = (req, res) => {
  const { errors, isValid } = validateReviewInput(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  const newReview = new Review({
    text: req.body.text,
    author: req.body.author,
    avatar: req.body.avatar,
    user: req.user.id,
    product: req.body.id,
    model: req.body.model,
    cover: req.body.cover
  });

  newReview.save().then(Review => res.json(Review));
};

// Delete Review
exports.deleteReview = (req, res) => {
  User.findOne({ user: req.user.id }).then(user => {
    Review.findById(req.params.id)
      .then(review => {
        // Check for review owner
        if (review.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        }

        // Delete
        review.remove().then(() => res.json({ success: true }));
      })
      .catch(err =>
        res.status(404).json({ reviewnotfound: "No review found" })
      );
  });
};

// Like review
exports.likeReview = (req, res) => {
  User.findOne({ user: req.user.id }).then(user => {
    Review.findById(req.params.id)
      .then(review => {
        if (
          review.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyliked: "User already liked this review" });
        }

        // Add user id to likes array
        review.likes.unshift({ user: req.user.id });

        review.save().then(review => res.json(review));
      })
      .catch(err =>
        res.status(404).json({ reviewnotfound: "No review found" })
      );
  });
};

// Unlike Review
exports.unlikeReview = (req, res) => {
  User.findOne({ user: req.user.id }).then(user => {
    Review.findById(req.params.id)
      .then(review => {
        if (
          review.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ notliked: "You have not yet liked this review" });
        }

        // Get remove index
        const removeIndex = review.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id);

        // Splice out of array
        review.likes.splice(removeIndex, 1);

        // Save
        review.save().then(review => res.json(review));
      })
      .catch(err =>
        res.status(404).json({ reviewnotfound: "No review found" })
      );
  });
};

// Comment on review
exports.commentOnReview = (req, res) => {
  const { errors, isValid } = validateReviewInput(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  Review.findById(req.params.id)
    .then(review => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      };

      // Add to comments array
      review.comments.unshift(newComment);

      // Save
      review.save().then(review => res.json(review));
    })
    .catch(err => res.status(404).json({ reviewnotfound: "No review found" }));
};

// Delete comment on review
exports.deleteComment = (req, res) => {
  Review.findById(req.params.id)
    .then(review => {
      // Check to see if comment exists
      if (
        review.comments.filter(
          comment => comment._id.toString() === req.params.comment_id
        ).length === 0
      ) {
        return res
          .status(404)
          .json({ commentnotexists: "Comment does not exist" });
      }

      // Get remove index
      const removeIndex = review.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);

      // Splice comment out of array
      review.comments.splice(removeIndex, 1);

      review.save().then(review => res.json(review));
    })
    .catch(err => res.status(404).json({ reviewnotfound: "No review found" }));
};
