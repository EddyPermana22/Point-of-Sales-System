"use strict";

const mongoose = require("mongoose");

const SoldProductSchema = new mongoose.Schema(
  {},
  { versionKey: false, timestamps: true }
);

const SoldProductModel = mongoose.model("SoldProduct", SoldProductSchema);

module.exports = SoldProductModel;
