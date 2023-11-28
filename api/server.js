const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3001;
mongoose
  .connect(
    "mongodb+srv://gfs00200:94A3idgs24nq4u7o@cluster0.3tduiey.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("db connection successful");
  });

const db = mongoose.connection;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin"
  );
  next();
});

app.get("/games", (req, res) => {
  res.json({
    games: [
      "dummy1",
      "dummy2",
      "dummy3",
      "dummy4",
      "dummy5",
      "dummy6",
      "dummy7",
    ],
  });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
