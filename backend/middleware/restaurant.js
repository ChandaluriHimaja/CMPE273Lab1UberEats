module.exports = function (req, res, next) {
  if (req.user.isRestaurant != 1) return res.status(403).send("Forbidden");

  next();
};
