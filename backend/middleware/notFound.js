module.exports = (req, res, next) => {
  const err = new Error("Not Found");
  res.status(404).json({
    error: {
      message: `Route not found: ${req.url}`,
    },
  });
};
