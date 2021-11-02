module.exports = function (req, res, next) {
  console.log("Is Restaurant: ", req.user.isRestaurant);
  if (!req.user.isRestaurant) return res.status(403).send("Forbidden");

  next();
};
