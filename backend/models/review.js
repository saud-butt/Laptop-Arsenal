const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

// Create Schema
const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "product"
  },
  text: {
    type: String,
    required: true
  },
  author: {
    type: String
  },
  avatar: {
    type: String
  },
  cover: {
    type: String
  },
  model: {
    type: String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

reviewSchema.plugin(mongoosePaginate);

reviewSchema.index({
  name: "text"
});

reviewSchema.plugin(aggregatePaginate);

module.exports = Review = mongoose.model("review", reviewSchema);
