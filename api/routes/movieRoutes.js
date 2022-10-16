const express = require("express");
const movieController = require("../controllers/movieController");

const router = express.Router();

router
  .route("/")
  .get(movieController.getAllMovies)
  .post(movieController.createMovie);

router.route("/:id").get(movieController.getMovie);

module.exports = router;
