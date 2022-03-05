// configure mongo db

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://akhil:akhil123@hospitalapi.gre2w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error in connecting to mongoDB"));

db.once("open", () => {
  console.log("Database connected");
});

module.export = db;
