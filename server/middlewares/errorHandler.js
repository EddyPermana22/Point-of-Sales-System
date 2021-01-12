"use strict";

const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.log(err);
  }

  const customError = {
    code: 500,
    message: "",
  };

  switch (err.name) {
    case "CastError":
      customError.code = 404;
      customError.message = `data not found`;
      break;
    case "LoginError":
      customError.code = err.code || 400;
      customError.message =
        err.message || `invalid email / phone & password combination`;
      break;
    case "CustomerAuthentication":
      customError.code = err.code || 401;
      customError.message = err.message || `authentication error`;
      break;
    case "JsonWebTokenError":
      customError.code = err.code || 401;
      customError.message = err.message || `invalid access token`;
      break;
    case "ResetPasswordError":
      customError.code = err.code || 400;
      customError.message =
        err.message || `reset password failed, please try again`;
      break;
    default:
      customError.code = 500;
      customError.message = err.message || `internal server error`;
  }

  res.status(customError.code).json({
    message: customError.message,
  });
};

module.exports = errorHandler;
