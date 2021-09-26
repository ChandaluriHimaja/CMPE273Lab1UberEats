const express = require("express");
const router = express.Router();
const { Restaurant } = require("../models/restaurant");
const { Auth } = require("../models/auth");

router.get("/", async (req, res) => {
  try {
    const restaurant = await Restaurant.getAllRestaurants();
    console.log("RESTAURANT ALL : ", restaurant);
    res.send(restaurant);
  } catch (err) {
    console.log("GET ALL RESTAURANTS: ", err);
  }
});

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
      description: "",
      restaurantImg:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcwdaust.com.au%2Fcommercial%2Flot-5883-manganese-st-wedgefield%2Fplaceholder-restaurant%2F&psig=AOvVaw2ibQT5OoBuyVyi5Fam0u6m&ust=1632549929985000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCLCMi8f4lvMCFQAAAAAdAAAAABAD",
      openingTime: "08:00:00",
      closingTime: "20:00:00",
      pickupMode: 1,
      deliveryMode: 1,
    });
    res.status(200).send("Account created successfully");
  } catch (err) {
    console.log("Error: restaurant add new ", err);
  }
});

router.get("/:id", async (req, res) => {
  const [restaurant] = await Restaurant.findById(req.params.id);
  if (!restaurant) {
    return res
      .status(404)
      .send("Restaurant data with auth credentials was not found");
  }

  res.send(restaurant);
});

router.post("/update", async (req, res) => {
  try {
    const result = Restaurant.validateProfileUpdate(req.body);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }

    const data = req.body;

    data.pickupMode = data.pickupMode ? 1 : 0;
    data.deliveryMode = data.deliveryMode ? 1 : 0;

    await Restaurant.updateRestaurantDetails(data);
    res.send("Successfully updated restaurant data");
  } catch (err) {
    console.log("Error: restaurant add new ", err);
  }
});

module.exports = router;
