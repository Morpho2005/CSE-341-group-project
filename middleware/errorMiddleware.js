const errorMiddleware = (err, req, res, next) => {
  console.log(`Error: ${err.stack}`);
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "😒" : err.stack,
  });
};

module.exports = errorMiddleware;
