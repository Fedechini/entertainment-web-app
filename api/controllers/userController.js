const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");

exports.getUser = (req, res) => {
  const user = req.user;

  res.status(200).json({
    status: "success",
    user,
  });
};

exports.deleteBookmark = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(
    { _id: req.user.id },
    { $pull: { bookmarks: req.params.id } }
  );

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.addBookmark = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    { _id: req.user.id },
    { $push: { bookmarks: req.params.id } }
  );

  if (!updatedUser) {
    return next(new AppError("Sorry, try again a bit later", 404));
  }

  res.status(200).json({
    status: "success",
    updatedUser,
  });
});
