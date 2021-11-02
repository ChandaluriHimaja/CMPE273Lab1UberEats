const express = require("express");
const router = express.Router();
const { User } = require("../mongoModels/user");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  console.log("req.body: ", req.body);
  try {
    const user = await User.findById(req.user._id);
    const address = {
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      zipCode: req.body.zipCode,
    };
    user.addresses.push(address);
    await user.save();
    res.send("Address Added successfully");
  } catch (err) {
    console.log("ADD delivery address: ", err);
  }
});

module.exports = router;
