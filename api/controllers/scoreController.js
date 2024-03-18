const Score = require("../models/scoreModel");
const Game = require("../models/gameModel");

exports.getScores = async (req, res) => {
  try {
    const gameId = req.params.gameId;
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({
        status: "fail",
        message: "Game not found.",
      });
    }
    const scores = game.scores;

    res.status(200).json({
      status: "success",
      results: scores.length,
      data: { scores },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getScore = async (req, res) => {
  try {
    const score = await Score.findById(req.params.scoreId);

    res.status(200).json({
      status: "success",
      data: score,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createScore = async (req, res) => {
  try {
    const gameId = req.params.gameId;
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({
        status: "fail",
        message: "Game not found.",
      });
    }

    const newScore = await Score.create({
      ...req.body,
      game: gameId,
    });

    game.scores.push(newScore);
    await game.save();

    res.status(201).json({
      status: "success",
      scores: newScore,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateScore = async (req, res) => {
  try {
    const score = await Score.findByIdAndUpdate(req.params.scoreId, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        score,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteScore = async (req, res) => {
  try {
    const scoreId = req.params.scoreId;
    const game = await Game.findById(req.params.gameId);

    game.scores.pull({ _id: scoreId });
    await game.save();
    await Score.findByIdAndDelete(scoreId);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message || err,
    });
  }
};
