"use strict";

const InvoiceRouter = require("express").Router();

const InvoiceController = require("../controllers/invoice");

InvoiceRouter.post("/", InvoiceController.add);

module.exports = InvoiceRouter;
