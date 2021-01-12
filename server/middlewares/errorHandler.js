"use strict";

const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.log(err);
  }

  res.status(err.code || 500).json({
    message: err.message || "internal server error",
  });
};

module.exports = errorHandler;
