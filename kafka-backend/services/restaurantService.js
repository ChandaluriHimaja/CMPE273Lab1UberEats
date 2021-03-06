const {
  User,
  validateUserInput,
  validateDishInput,
} = require("../mongoModels/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");

getAllRestaurants = async (req, callback) => {
  let res = {};
  try {
    const restaurants = await User.find({ isRestaurant: true });
    // res.send(restaurants);
    res.status = 200;
    res.data = restaurants;
    callback(null, res);
  } catch (err) {
    console.log("GET ALL RESTAURANTS: ", err);
  }
};

getRestaurantData = async (req, callback) => {
  let res = {};
  try {
    console.log("req.user: ", req.user);
    const restaurant = await User.findOne({
      $and: [{ _id: req.user._id }, { isRestaurant: true }],
    });
    if (!restaurant) {
      //   return res
      //     .status(404)
      //     .send("Restaurant data with auth credentials was not found");
      res.status = 404;
      res.data = "Restaurant data with auth credentials was not found";
      callback(null, res);
    }

    // res.send(restaurant);
    res.status = 200;
    res.data = restaurant;
    callback(null, res);
  } catch (err) {
    console.log("Get by ID restaurant: ", err);
  }
};

addNewRestaurant = async (req, callback) => {
  let res = {};
  try {
    console.log("Req.body: ", req.body);

    const result = validateUserInput(req.body);
    if (result.error) {
      //   return res.status(400).send(result.error.details[0].message);
      res.status = 400;
      res.data = result.error.details[0].message;
      callback(null, res);
    }

    let restaurant = await User.findOne({ email: req.body.email });
    console.log("Restaurant: ", restaurant);
    if (restaurant) {
      // return res.status(400).send("Username already exists");
      res.status = 400;
      res.data = "Username already exists";
      callback(null, res);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const address = {
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      zipCode: req.body.zipCode,
    };

    restaurant = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      phoneNumber: req.body.phoneNumber,
      isRestaurant: true,
      picture:
        "https://hudsonvalley.org/wp-content/sabai/File/files/l_5f0ce99009f58cdc3f9d8be242a962d7.png",
      openingTime: "08:00",
      closingTime: "20:00",
      pickupMode: true,
      deliveryMode: true,
      addresses: [address],
    });

    restaurant.save();

    // res.status(200).send("Account created successfully");
    res.status = 200;
    res.data = "Account created successfully";
    callback(null, res);
  } catch (err) {
    console.log("Error: restaurant add new ", err);
    // res.status(500).send("Internal error");
    res.status = 500;
    res.data = "Internal error";
    callback(null, res);
  }
};

updateRestaurantData = async (req, callback) => {
  let res = {};
  try {
    const result = validateUserInput(req.body);
    if (result.error) {
      //   return res.status(400).send(result.error.details[0].message);
      res.status = 400;
      res.data = result.error.details[0].message;
      callback(null, res);
    }

    const restaurant = await User.findById(req.user._id);

    console.log("Restaurant: ", restaurant);

    restaurant.name = req.body.name;
    restaurant.phoneNumber = req.body.phoneNumber;
    restaurant.about = req.body.about;
    restaurant.picture = req.body.picture;
    restaurant.openingTime = req.body.openingTime;
    restaurant.closingTime = req.body.closingTime;
    restaurant.pickupMode = req.body.pickupMode;
    restaurant.deliveryMode = req.body.deliveryMode;
    restaurant.addresses[0].street = req.body.street;
    restaurant.addresses[0].city = req.body.city;
    restaurant.addresses[0].state = req.body.state;
    restaurant.addresses[0].country = req.body.country;
    restaurant.addresses[0].zipCode = req.body.zipCode;

    restaurant.save();

    // res.send("Successfully updated restaurant data");
    res.status = 200;
    res.data = "Successfully updated restaurant data";
    callback(null, res);
  } catch (err) {
    console.log("Error: restaurant add new ", err);
  }
};

addDishToRestaurant = async (req, callback) => {
  let res = {};
  try {
    const result = validateDishInput(req.body);
    if (result.error) {
      //   return res.status(400).send(result.error.details[0].message);
      res.status = 400;
      res.data = result.error.details[0].message;
      callback(null, res);
    }

    const restaurant = await User.findOne({
      $and: [{ _id: req.user._id }, { isRestaurant: true }],
    });

    const dish = {
      name: req.body.name,
      mainIngrediant: req.body.mainIngrediant,
      image: req.body.image,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      type: req.body.type,
    };

    restaurant.dishes.push(dish);

    await restaurant.save();
    // res.send("Added dish successfully");
    res.status = 200;
    res.data = "Added dish successfully";
    callback(null, res);
  } catch (err) {
    console.log("POST dishes: ", err);
  }
};

function handle_request(msg, callback) {
  console.log(msg);
  if (msg.path === "getAllRestaurants") {
    getAllRestaurants(msg, callback);
  } else if (msg.path === "getRestaurantData") {
    getRestaurantData(msg, callback);
  } else if (msg.path === "addNewRestaurant") {
    addNewRestaurant(msg, callback);
  } else if (msg.path === "updateRestaurantData") {
    updateRestaurantData(msg, callback);
  } else if (msg.path === "addDishToRestaurant") {
    addDishToRestaurant(msg, callback);
  }
}

exports.handle_request = handle_request;
