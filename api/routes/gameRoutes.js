const express = require("express");
const gameController = require("../controllers/gameController");
const scoreRouter = require("./scoreRoutes");

const router = express.Router();

router.use("/:gameId/scores", scoreRouter);

router
  .route("/")
  .get(gameController.getAllGames)
  .post(gameController.createGame);

router
  .route("/:gameId")
  .get(gameController.getGame)
  .patch(gameController.updateGame)
  .delete(gameController.deleteGame);

module.exports = router;
