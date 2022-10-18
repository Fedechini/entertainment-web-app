const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User must have a name"],
      unique: true,
      maxlength: [20, "Username must not be longer than 20 characters"],
    },
    email: {
      type: String,
      required: [true, "User must have an email"],
      unique: true,
      lowecase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (passwordConfirm) {
          return passwordConfirm === this.password;
        },
        message: "Passwords do not match",
      },
    },
    bookmarks: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Movie",
        unique: true,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre(/^find/, function (next) {
  this.populate({
    path: "bookmarks",
  });

  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next;

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.checkPassword = async function (
  inputPassword,
  userPassword
) {
  return await bcrypt.compare(inputPassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
