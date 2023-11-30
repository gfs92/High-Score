const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A name for your game is required"],
    unique: [true, "A game with this name already exists"],
  },
  score: {
    type: Number,
    // required: [true, "A score is required"],
  },
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
