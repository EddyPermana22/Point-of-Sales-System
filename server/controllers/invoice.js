"use strict";

const InvoiceModel = require("../models/invoice");
const SoldProductModel = require("../models/soldProduct");

class InvoiceController {
  static add = async (req, res, next) => {
    try {
      const { customerName, salesPersonName, notes, products } = req.body;

      const newInvoiceData = {
        customerName: customerName,
        salesPersonName: salesPersonName,
        notes: notes,
      };

      const invoice = await InvoiceModel.create(newInvoiceData);

      const soldProductsData = products.map((product) => {
        return {
          invoice: invoice._id,
          name: product.name,
          picture: product.picture,
          quantity: product.quantity,
          price: product.price,
        };
      });

      const soldProduct = await SoldProductModel.insertMany(soldProductsData);

      res.status(200).json({
        message: "invoice created!",
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = InvoiceController;
