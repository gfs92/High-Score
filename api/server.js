const mongoose = require("mongoose");

const app = require("./app");

const port = process.env.PORT || 3001;

mongoose
  .connect(
    "mongodb+srv://gfs00200:94A3idgs24nq4u7o@cluster0.3tduiey.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("db connection successful");
  });

const db = mongoose.connection;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
