exports.getUser = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: "ONE USER",
  });
};

// TODO: use req.user
exports.getAllBookmarks = (req, res, next) => {};

exports.deleteBookmark = (req, res, next) => {};

exports.addBookmark = (req, res, next) => {};
