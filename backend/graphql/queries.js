const { User, validateUserInput } = require("../mongoModels/user");
const { Order } = require("../mongoModels/orders");
const bcrypt = require("bcrypt");
const _ = require("lodash");

const getCustomerById = async (args) => {
  const customer = await User.findById(args.id);
  console.log("Customer: ", customer);
  if (!customer) {
    return "Customer data with auth credentials was not found";
  }

  return customer;
};

const getDishById = async (args) => {
  try {
    const restaurant = await User.findOne({
      $and: [{ isRestaurant: true }, { "dishes._id": { $eq: args.id } }],
    });
    console.log("DishRest: ", restaurant);
    console.log(restaurant.dishes[0]._id.toString());
    const dish = _.find(restaurant.dishes, (dish) => {
      return dish._id.toString() == args.id;
    });
    console.log("Dish: ", dish);
    return dish;
  } catch (err) {
    console.log("get dish: ", err);
  }
};

const getCustomerOrdersById = async (args) => {
  try {
    console.log("custId: ", args.id);
    let orders = await Order.find({ _custId: args.id });
    orders = _.orderBy(orders, ["dateTime"], ["desc"]);
    console.log("OREDRS RETURN cust: ", orders);
    return orders;
  } catch (err) {
    console.log("Get customer: ", err);
  }
};

const getRestaurantOrdersById = async (args) => {
  try {
    let orders = await Order.find({
      _restaurantId: args.id,
    });
    orders = _.orderBy(orders, ["dateTime"], ["desc"]);
    console.log("OREDRS RETURN: ", orders);
    return orders;
  } catch (err) {
    console.log("Get customer: ", err);
  }
};

const getOrderDetailsById = async (args) => {
  try {
    const order = await Order.findById(args.id);
    return order;
  } catch (err) {
    console.log("GET ORDER Error: ", err);
  }
};

const getAllRestaurants = async () => {
  try {
    const restaurants = await User.find({ isRestaurant: true });
    return restaurants;
  } catch (err) {
    console.log("GET ALL RESTAURANTS: ", err);
  }
};

const getRestaurantById = async (args) => {
  try {
    console.log("Reached here");
    const restaurant = await User.findOne({
      $and: [{ _id: args.id }, { isRestaurant: true }],
    });
    if (!restaurant) {
      return "Restaurant data with auth credentials was not found";
    }
    console.log("RESTAUARNATA: ", restaurant);
    return restaurant;
  } catch (err) {
    console.log("Get by ID restaurant: ", err);
  }
};

module.exports.getCustomerById = getCustomerById;
module.exports.getDishById = getDishById;
module.exports.getCustomerOrdersById = getCustomerOrdersById;
module.exports.getRestaurantOrdersById = getRestaurantOrdersById;
module.exports.getOrderDetailsById = getOrderDetailsById;
module.exports.getAllRestaurants = getAllRestaurants;
module.exports.getRestaurantById = getRestaurantById;
