const Game = require("../models/gameModel");
const { uploadFile } = require("@uploadcare/upload-client");

exports.getAllGames = async (req, res) => {
  try {
    const games = await Game.find();

    res.status(200).json({
      status: "success",
      results: games.length,
      data: { games },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId);
    res.status(200).json({
      status: "success",
      data: {
        game,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createGame = async function (req, res) {
  try {
    let imageUpload = null;
    if (req.file) {
      const uploadedFile = req.file.buffer;

      const image = await uploadFile(uploadedFile, {
        publicKey: "28e08d93a9709c716e24",
        store: "auto",
        metadata: {
          subsystem: "js-client",
          pet: "cat",
        },
      });
      imageUpload = image.cdnUrl;
    }

    const scoreTypesArray = req.body.scoreTypes
      .split(",")
      .map((scoreType) => scoreType.trim());

    const newGame = await Game.create({
      gameName: req.body.gameName,
      gameURL: req.body.gameURL,
      scoreTypes: scoreTypesArray,
      imageUpload: imageUpload,
    });

    res.status(201).json({
      status: "success",
      data: {
        game: newGame,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.gameId, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        game,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteGame = async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.gameId);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
