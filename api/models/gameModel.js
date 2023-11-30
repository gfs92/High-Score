const mongoose = require("mongoose");
const Score = require("./scoreModel");

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A name for your game is required"],
    unique: [true, "A game with this name already exists"],
  },
  scores: [Score.schema],
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
