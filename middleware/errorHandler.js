const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    error: err.name,
    message: err.message
  });
};
export default errorHandler;