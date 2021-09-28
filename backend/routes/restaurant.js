const express = require("express");
const router = express.Router();
const { Restaurant } = require("../models/restaurant");
const { Auth } = require("../models/auth");
const { Dishes } = require("../models/dishes");
// const Promise = require("bluebird");

router.get("/dishes/:id", async (req, res) => {
  try {
    const dishes = await Dishes.findByRestaurantId(req.params.id);
    res.send(dishes);
  } catch (err) {
    console.log("get restaurant dishes: ", err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const [restaurant] = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res
        .status(404)
        .send("Restaurant data with auth credentials was not found");
    }

    res.send(restaurant);
  } catch (err) {
    console.log("Get by ID restaurant: ", err);
  }
});

router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.getAllRestaurants();

    const restaurantsAndDishesList = [];

    await Promise.all(
      restaurants.map(async (restaurant) => {
        const id = restaurant._id;
        const dishes = await Dishes.findByRestaurantId(id);
        // restaurant.dishes = dishes;
        const newRestConst = { ...restaurant, dishes };
        console.log("NEWRESCONST: ", newRestConst);
        restaurantsAndDishesList.push(newRestConst);
      })
    );
    console.log("RESTAURANT ALL : ", restaurantsAndDishesList);
    res.send(restaurantsAndDishesList);
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
        "https://hudsonvalley.org/wp-content/sabai/File/files/l_5f0ce99009f58cdc3f9d8be242a962d7.png",
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

router.post("/dish", async (req, res) => {
  try {
    const result = Dishes.validate(req.body);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }

    await Dishes.addNewDish(req.body);
    res.send("Added dish successfully");
  } catch (err) {
    console.log("POST dishes: ", err);
  }
});

module.exports = router;
