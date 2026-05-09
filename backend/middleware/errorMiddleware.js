// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    message: err.message || "Server Error",
  });
};