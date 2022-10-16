const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Movie must have a title"],
      unique: true,
    },
    thumbnail: {
      trending: {
        small: { type: String },
        large: { type: String },
      },
      regular: {
        small: { type: String },
        medium: { type: String },
        large: { type: String },
      },
    },
    year: {
      type: Number,
      required: [true, "Movie must have a year"],
    },
    category: {
      type: String,
      required: [true, "Movie must have a category"],
      enum: ["Movie", "TV Series"],
    },
    rating: {
      type: String,
      required: [true, "Movie must have a rating"],
    },
    isBookmarked: {
      type: Boolean,
      default: false,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
