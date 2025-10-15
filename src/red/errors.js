function errorHandler(err, req, res, next) {
  console.error('[error]', err);
  res.status(500).send({
    error: true,
    message: err.message || 'Error interno',
  });
}

module.exports = errorHandler;