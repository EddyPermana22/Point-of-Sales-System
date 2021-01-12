"use strict";

const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      min: 2,
      max: 50,
    },
    salesPersonName: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      min: 2,
      max: 50,
    },
    notes: {
      type: String,
      max: 1000,
    },
    status: {
      type: String,
      enum: ["published"],
      required: true,
      default: "published",
    },
  },
  { versionKey: false, timestamps: true }
);

const InvoiceModel = mongoose.model("Invoice", InvoiceSchema);

module.exports = InvoiceModel;
