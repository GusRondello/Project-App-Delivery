module.exports = (err, _req, res, _next) => {
  if (err.isBoom) {
    const { output: { statusCode, payload } } = err;

    return res.status(statusCode).json({ ...payload });
  }

  console.error(err);

  return res.status(500).json({
    error: err.name,
    message: err.message,
    statusCode: 500,
  });
};
