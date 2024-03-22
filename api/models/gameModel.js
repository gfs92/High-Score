const mongoose = require("mongoose");
const Score = require("./scoreModel");

const gameSchema = new mongoose.Schema({
  gameName: {
    type: String,
    required: [true, "A name for your game is required"],
    unique: [true, "A game with this name already exists"],
  },
  gameURL: {
    type: String,
    required: false,
    unique: true,
  },
  scores: [Score.schema],
  scoreTypes: [
    {
      type: String,
      required: [true, "A score name to track is required"],
      unique: [false],
    },
  ],
  imageUpload: {
    type: String,
    required: false,
    unique: false,
  },
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
