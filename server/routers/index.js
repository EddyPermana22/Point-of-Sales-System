"use strict";

const rootRouter = require("express").Router();

const InvoiceRouter = require("./invoice");

rootRouter.get("/", (req, res, next) => {
  res.status(200).json({
    message: `WidaTech POS API Server Ready!`,
  });
});

rootRouter.use("/invoices", InvoiceRouter);

module.exports = rootRouter;
