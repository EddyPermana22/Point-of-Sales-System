"use strict";

const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema(
  {},
  { versionKey: false, timestamps: true }
);

const InvoiceModel = mongoose.model("Invoice", InvoiceSchema);

module.exports = InvoiceModel;
