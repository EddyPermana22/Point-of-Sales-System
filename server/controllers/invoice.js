"use strict";

const InvoiceModel = require("../models/invoice");
const SoldProductModel = require("../models/soldProduct");

class InvoiceController {
  static add = async (req, res, next) => {
    try {
      const { customerName, salesPersonName, notes, products } = req.body;

      let total = 0;

      products.forEach((product) => {
        total += +product.price * +product.quantity;
      });

      const newInvoiceData = {
        customerName: customerName,
        salesPersonName: salesPersonName,
        notes: notes,
        total: total,
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

  static getAll = async (req, res, next) => {
    try {
      const { offset } = req.body;

      const invoices = await InvoiceModel.find()
        .skip(+offset)
        .limit(10);

      res.status(200).json({
        invoices,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = InvoiceController;
