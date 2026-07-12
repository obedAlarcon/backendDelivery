function logErrors(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  const { output } = err;
  if (output) {
    res.status(output.statusCode).json(output.payload);
  } else {
    res.status(500).json({
      statusCode: 500,
      error: 'Internal Server Error',
      message: err.message,
    });
  }
}

module.exports = { logErrors, errorHandler };
