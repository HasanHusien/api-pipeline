exports.registerRequestTime = (req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
};
