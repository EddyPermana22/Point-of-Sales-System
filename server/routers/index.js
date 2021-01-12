"use strict";

const rootRouter = require("express").Router();

rootRouter.get("/", (req, res, next) => {
  res.status(200).json({
    message: `WidaTech POS API Server Ready!`,
  });
});

module.exports = rootRouter;
