exports.getAllUsers = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: "All USERS",
  });
};
