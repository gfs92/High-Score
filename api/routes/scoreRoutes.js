const express = require("express");
const scoreController = require("../controllers/scoreController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(scoreController.getScores)
  .post(scoreController.createScore);

router
  .route("/:scoreId")
  .get(scoreController.getScore)
  .patch(scoreController.updateScore)
  .delete(scoreController.deleteScore);

module.exports = router;
