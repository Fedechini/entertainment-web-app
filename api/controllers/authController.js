const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("token", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError("Wrong email or password", 401));
  }

  createSendToken(user, 200, res);
});

exports.logout = catchAsync(async (req, res, next) => {
  res.status(201).json({
    status: "success",
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new AppError("Please log in to get access.", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);

  if (!user) {
    return next(new AppError("This user does not exist", 401));
  }

  req.user = user;
  next();
});
