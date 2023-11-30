const express = require("express");

const gameRouter = require("./routes/gameRoutes");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin"
  );
  next();
});

app.use("/api/v1/games", gameRouter);

module.exports = app;
