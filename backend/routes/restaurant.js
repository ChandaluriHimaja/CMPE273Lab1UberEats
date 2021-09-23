const express = require("express");
const router = express.Router();
const { Restaurant } = require("../models/restaurant");
const { Auth } = require("../models/auth");

router.post("/", async (req, res) => {
  try {
    const result = Restaurant.validate(req.body);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }

    const {
      restaurantName,
      email,
      password,
      street,
      city,
      state,
      country,
      zipCode,
      phoneNumber,
      isRestaurant,
    } = req.body;

    let [user] = await Auth.checkIfUserExists({ email });
    if (user) return res.status(400).send("Username already exists");

    await Auth.addAuthDetails({
      email,
      password,
      isRestaurant: 1,
    });

    let [auth] = await Auth.checkIfUserExists({ email });

    await Restaurant.addNewRestaurant({
      authID: auth._id,
      restaurantName,
      street,
      city,
      state,
      country,
      zipCode,
      phoneNumber,
    });
    res.status(200).send("Account created successfully");
  } catch (err) {
    console.log("Error: restaurant add new ", err);
  }
});

module.exports = router;
