const express = require("express");
const port = process.env.PORT || 3000;
const app = express();

// const bodyParser = require("body-parser");
// app.use(bodyParser);

const passport = require("passport");
const passportJWT = require("./config/passport-jwt-strategy");

app.use(express.urlencoded());
app.use(passport.initialize());
app.use(express.json());

const db = require("./config/mongoose");

// routers

app.use("/", require("./routes/index.js"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error in running server!", err);
    return;
  }
  console.log("Express server running fine on port : ", port);
  return;
});
