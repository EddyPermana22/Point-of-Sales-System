"use strict";

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const port = process.env.PORT;
const mongoURL = process.env.MONGOURL;

const app = express();

mongoose
  .connect(mongoURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`connected to database, ${mongoURL}`);
    app.listen(port, () => {
      console.log(`nodeJS server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(`error when starting the server, ${err}`);
  });
