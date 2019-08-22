const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const morganBody = require("morgan-body");
const mongoDBUrl = require("../config/keys_dev").mongoURI;

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
morganBody(app, { maxBodyLength: 10000, logRequestBody: true });

module.exports = app;
