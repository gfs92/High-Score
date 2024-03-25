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

    const groupedScores = game.scores.reduce((acc, cur) => {
      const { username, scoreType, score } = cur;
      const existingUser = acc.find((user) => user.username === username);

      if (existingUser) {
        existingUser.scores[scoreType] = score;
      } else {
        const newUser = {
          username: username,
          scores: { [scoreType]: score },
        };
        acc.push(newUser);
      }

      return acc;
    }, []);

    res.status(200).json({
      status: "success",
      // results: scores.length,
      data: groupedScores,
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
    const existingScores = game.scores;
    const mainScore = game.scoreTypes[0];

    const newScores = req.body.map((scoreData) => ({
      username: scoreData.username,
      scoreType: scoreData.scoreType,
      score: scoreData.score,
      game: gameId,
    }));
    const updatingUsername = newScores[0]?.username;
    const newMainScore = newScores.find(
      (scoreData) => scoreData.scoreType === mainScore
    );
    const existingMainScore = existingScores.find(
      (score) =>
        score.username === updatingUsername && score.scoreType === mainScore
    );

    if (!existingMainScore) {
      game.scores.push(...newScores);
    } else if (existingMainScore.score <= newMainScore.score) {
      game.scores = game.scores.filter(
        (score) => score.username !== updatingUsername
      );
      game.scores.push(...newScores);
    }

    await game.save();

    res.status(201).json({
      status: "success",
      message: "Scores created/updated successfully",
      scores: newScores,
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
