const catchAsync = require("../utils/catchAsync");

exports.signup = catchAsync(async (req, res, next) => {
  res.status(201).json({
    status: "success",
  });
});

exports.login = catchAsync(async (req, res, next) => {
  res.status(201).json({
    status: "success",
  });
});

exports.logout = catchAsync(async (req, res, next) => {
  res.status(201).json({
    status: "success",
  });
});
