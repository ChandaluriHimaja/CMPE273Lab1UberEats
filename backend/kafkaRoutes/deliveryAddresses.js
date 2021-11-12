const express = require("express");
const router = express.Router();
const { User } = require("../mongoModels/user");
const auth = require("../middleware/auth");
const kafka = require("../kafka/client");

router.post("/", auth, async (req, res) => {
  console.log("req.body: ", req.body);
  msg = {};
  msg.path = "addDeliveryAddress";
  msg.user = req.user;
  msg.body = req.body;
  kafka.make_request("deliveryAddress", msg, (err, results) => {
    res.status(results.status).send(results.data);
  });
  // try {
  //   const user = await User.findById(req.user._id);
  //   const address = {
  //     street: req.body.street,
  //     city: req.body.city,
  //     state: req.body.state,
  //     country: req.body.country,
  //     zipCode: req.body.zipCode,
  //   };
  //   user.addresses.push(address);
  //   await user.save();
  //   res.send("Address Added successfully");
  // } catch (err) {
  //   console.log("ADD delivery address: ", err);
  // }
});

module.exports = router;
