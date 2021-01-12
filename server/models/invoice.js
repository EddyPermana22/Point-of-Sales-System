"use strict";

const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      minlength: 2,
      maxlength: 50,
    },
    salesPersonName: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      minlength: 2,
      maxlength: 50,
    },
    notes: {
      type: String,
      maxlength: 1000,
    },
    total: {
      type: Number,
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
