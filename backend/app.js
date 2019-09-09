const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const Users = require("./routes/api/users");
const morganBody = require("morgan-body");
const mongoDBUrl = require("../config/keys_dev").mongoURI;
const cors = require("cors");

// Connect MongoDB
mongoose
  .connect(mongoDBUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(e => console.log(`MongoDB Error: ${e}`));

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
morganBody(app, { maxBodyLength: 10000, logRequestBody: true });

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("../config/passport")(passport);

app.use("/api/users", Users);
require("./routes/api")(app);

module.exports = app;
