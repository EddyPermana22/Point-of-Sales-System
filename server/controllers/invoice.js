"use strict";

const InvoiceModel = require("../models/invoice");

class InvoiceController {
  static add = async (req, res, next) => {
    try {
      const { customerName, salesPersonName, notes, products } = req.body;

      const newInvoiceData = {
        customerName: customerName,
        salesPersonName: salesPersonName,
        notes: notes,
      };

      const invoice = await InvoiceModel.create(newInvoiceData)

      

    } catch (error) {
      next(error);
    }
  };
}

module.exports = InvoiceController;
