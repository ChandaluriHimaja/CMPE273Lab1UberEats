const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const { Auth } = require("../models/auth");

router.post("/", async (req, res) => {
  try {
    const result = User.validate(req.body);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }

    const { email, password } = req.body;

    let [user] = await Auth.checkIfUserExists({ email });
    if (user) return res.status(400).send("Username already exists");

    await User.addUserDetails({ email, password, isRestaurant: false });
    res.status(200).send("Account created successfully");
  } catch (err) {
    console.log("Error: user add new ", err);
  }
});

module.exports = router;
