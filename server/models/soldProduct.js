"use strict";

const mongoose = require("mongoose");

const SoldProductSchema = new mongoose.Schema(
  {
    invoice: {
      type: mongoose.Types.ObjectId,
      ref: "Invoice",
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
    },
    picture: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      min: 1,
    },
    price: {
      type: Number,
      min: 0.01,
      max: 99999999,
    },
  },
  { versionKey: false, timestamps: true }
);

const SoldProductModel = mongoose.model("SoldProduct", SoldProductSchema);

module.exports = SoldProductModel;
