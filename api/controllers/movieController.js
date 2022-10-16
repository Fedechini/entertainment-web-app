exports.getAllMovies = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: "All movies",
  });
};
