const { User, validateDishInput } = require("../mongoModels/user");
const _ = require("lodash");

getDishById = async (req, callback) => {
  let res = {};
  try {
    const restaurant = await User.findOne({
      $and: [{ isRestaurant: true }, { "dishes._id": { $eq: req.params.id } }],
    });
    console.log("DishRest: ", restaurant);
    console.log(restaurant.dishes[0]._id.toString());
    const dish = _.find(restaurant.dishes, (dish) => {
      return dish._id.toString() == req.params.id;
    });
    console.log("Dish: ", dish);
    // res.send(dish);
    res.status = 200;
    res.data = dish;
    callback(null, res);
  } catch (err) {
    console.log("get dish: ", err);
  }
};

updateDishById = async (req, callback) => {
  let res = {};
  try {
    const result = validateDishInput(req.body);
    if (result.error) {
      //   return res.status(400).send(result.error.details[0].message);
      res.status = 200;
      res.data = result.error.details[0].message;
      callback(null, res);
    }

    const restaurant = await User.findOne({
      $and: [{ _id: req.user._id }, { isRestaurant: true }],
    });

    console.log("Restaurant: ", restaurant);

    const dish = _.find(restaurant.dishes, (dish) => {
      return dish._id.toString() == req.body._id;
    });

    console.log("Dish: ", dish);

    if (dish) {
      dish.name = req.body.name;
      dish.mainIngrediant = req.body.mainIngrediant;
      dish.image = req.body.image;
      dish.price = req.body.price;
      dish.description = req.body.description;
      dish.category = req.body.category;
      dish.type = req.body.type;
    }

    await restaurant.save();

    // res.send("Successfully updated dish data");
    res.status = 200;
    res.data = "Successfully updated dish data";
    callback(null, res);
  } catch (err) {
    console.log("Update dish: ", err);
  }
};

deleteDishById = async (req, callback) => {
  let res = {};
  try {
    console.log("GOT DELETE REQUEST DISH: ", req.params.id);
    await Dishes.deleteDish(req.params.id);
    // res.send("Deleted succesfully");
    res.status = 200;
    res.data = "Deleted succesfully";
    callback(null, res);
  } catch (err) {
    console.log("Delete dish: ", err);
  }
};

function handle_request(msg, callback) {
  console.log(msg);
  if (msg.path === "getDishById") {
    getDishById(msg, callback);
  } else if (msg.path === "updateDishById") {
    updateDishById(msg, callback);
  } else if (msg.path === "deleteDishById") {
    deleteDishById(msg, callback);
  }
}

exports.handle_request = handle_request;
