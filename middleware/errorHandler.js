const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({ message: 'Validation Error', errors });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  if (err.message === 'Task not found') {
    return res.status(404).json({ message: err.message });
  }

  res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = { errorHandler };
