const { User, validateUserInput } = require("../mongoModels/user");
const { Order } = require("../mongoModels/orders");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { response } = require("express");

const login = async (args) => {
  try {
    const { email, password } = args;

    let user = await User.findOne({ email });
    console.log("USER.email", user);
    if (!user) return "Invalid username";

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return "Invalid password";
    }

    const token = user.generateAuthToken();
    console.log("TOKENNNN: ", token);
    const response = {
      token,
    };
    return response;
  } catch (err) {
    console.log("ERROR: post:auth/ ", err);
  }
};

const signUpCustomer = async (args) => {
  try {
    const response = {};

    let user = await User.findOne({ email: args.email });
    if (user) return (response.message = "Username already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(args.password, salt);

    const address = {
      street: args.street,
      city: args.city,
      state: args.state,
      country: args.country,
      zipCode: args.zipCode,
    };

    user = new User({
      email: args.email,
      password: hashedPassword,
      isRestaurant: false,
      name: args.name,
      phoneNumber: args.phoneNumber,
      picture:
        "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
      addresses: [address],
    });

    await user.save();

    response.message = "Account created successfully";
    return response;
  } catch (err) {
    console.log("Error: user add new ", err);
  }
};

const signUpRestaurant = async (args) => {
  const response = {};
  try {
    let restaurant = await User.findOne({ email: args.email });
    console.log("Restaurant: ", restaurant);
    if (restaurant) {
      response.message = "Username already exists";
      return response;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(args.password, salt);

    const address = {
      street: args.street,
      city: args.city,
      state: args.state,
      country: args.country,
      zipCode: args.zipCode,
    };

    restaurant = new User({
      name: args.name,
      email: args.email,
      password: hashedPassword,
      phoneNumber: args.phoneNumber,
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

    response = "Account created successfully";
    return response;
  } catch (err) {
    console.log("Error: restaurant add new ", err);
  }
};

const restaurantUpdateOrderStatus = async (args) => {
  try {
    const response = {};

    console.log("Order Update: ", args);

    const order = await Order.findById(args.id);
    order.orderStatus = args.orderStatus;

    console.log("Order Updated: ", order);
    await order.save();

    response.message =
      "Successfully Updated order status to " + order.orderStatus;
    return response;
  } catch (err) {
    console.log("UPDATE ORDERS Error: ", err);
  }
};

const updateCustomerProfile = async (args) => {
  const response = {};
  try {
    const user = await User.findById(args.id);
    user.name = args.name;
    user.nickname = args.nickname;
    user.dateOfBirth = args.dateOfBirth;
    user.picture = args.picture;
    user.phoneNumber = args.phoneNumber;
    user.about = args.about;
    user.addresses[0].street = args.street;
    user.addresses[0].city = args.city;
    user.addresses[0].state = args.state;
    user.addresses[0].country = args.country;
    user.addresses[0].zipCode = args.zipCode;

    await user.save();

    response.message = "Successfully updated customer data";
    return response;
  } catch (err) {
    console.log("Error: Customer Update: ", err);
    response.message = "Error occured while updating data";
    return response;
  }
};

const updateRestaurantProfile = async (args) => {
  const response = {};
  try {
    const result = validateUserInput(args);
    if (result.error) {
      response.message = result.error.details[0].message;
      return response;
    }

    const restaurant = await User.findById(req.user._id);

    console.log("Restaurant: ", restaurant);

    restaurant.name = args.name;
    restaurant.phoneNumber = args.phoneNumber;
    restaurant.about = args.about;
    restaurant.picture = args.picture;
    restaurant.openingTime = args.openingTime;
    restaurant.closingTime = args.closingTime;
    restaurant.pickupMode = args.pickupMode;
    restaurant.deliveryMode = args.deliveryMode;
    restaurant.addresses[0].street = args.street;
    restaurant.addresses[0].city = args.city;
    restaurant.addresses[0].state = args.state;
    restaurant.addresses[0].country = args.country;
    restaurant.addresses[0].zipCode = args.zipCode;

    restaurant.save();

    response.message = "Successfully updated restaurant data";
    return response;
  } catch (err) {
    console.log("Error: restaurant add new ", err);
  }
};

const addNewDeliveryAddressForCustomer = async (args) => {
  const response = {};
  try {
    const user = await User.findById(args._id);
    const address = {
      street: args.street,
      city: args.city,
      state: args.state,
      country: args.country,
      zipCode: args.zipCode,
    };
    user.addresses.push(address);
    await user.save();
    response.message = "Address Added successfully";
    return response;
  } catch (err) {
    response.message = "ADD delivery address: " + err;
    return response;
  }
};

const addDishToRestaurant = async (args) => {
  const response = {};
  try {
    const restaurant = await User.findOne({
      $and: [{ _id: args.id }, { isRestaurant: true }],
    });

    const dish = {
      name: args.name,
      mainIngrediant: args.mainIngrediant,
      image: args.image,
      price: args.price,
      description: args.description,
      category: args.category,
      type: args.type,
    };

    restaurant.dishes.push(dish);

    await restaurant.save();
    response.message = "Added dish successfully";
    return response;
  } catch (err) {
    console.log("POST dishes: ", err);
  }
};

const updateDishById = async (args) => {
  const response = {};
  try {
    const restaurant = await User.findOne({
      $and: [{ _id: args._restid }, { isRestaurant: true }],
    });

    console.log("Restaurant: ", restaurant);

    const dish = _.find(restaurant.dishes, (dish) => {
      return dish._id.toString() == args._id;
    });

    console.log("Dish: ", dish);

    if (dish) {
      dish.name = args.name;
      dish.mainIngrediant = args.mainIngrediant;
      dish.image = args.image;
      dish.price = args.price;
      dish.description = args.description;
      dish.category = args.category;
      dish.type = args.type;
    }

    await restaurant.save();

    response.message = "Successfully updated dish data";
    return response;
  } catch (err) {
    console.log("Update dish: ", err);
  }
};

const placeOrder = async (args) => {
  const response = {};
  try {
    const orderItems = [];

    args.orderItems.forEach((orderItem) => {
      const item = {
        _dishId: orderItem._dishId,
        quantity: orderItem.quantity,
        price: orderItem.price,
      };
      orderItems.push(item);
    });

    const order = new Order({
      _restaurantId: args._restaurantId,
      _custId: args._id,
      _deliveryAddressId: args._deliveryAddressId,
      dateTime: args.dateTime,
      totalPrice: args.totalPrice,
      orderMode: args.orderMode,
      orderStatus: args.orderStatus,
      orderItems: orderItems,
      orderNote: args.orderNote,
    });

    await order.save();

    response.message = "Succesfully added orders";
    return response;
  } catch (err) {
    console.log("Orders post err: ", err);
  }
};

module.exports.login = login;
module.exports.signUpCustomer = signUpCustomer;
module.exports.restaurantUpdateOrderStatus = restaurantUpdateOrderStatus;
module.exports.updateCustomerProfile = updateCustomerProfile;
module.exports.addNewDeliveryAddressForCustomer =
  addNewDeliveryAddressForCustomer;
module.exports.signUpRestaurant = signUpRestaurant;
module.exports.updateRestaurantProfile = updateRestaurantProfile;
module.exports.addDishToRestaurant = addDishToRestaurant;
module.exports.updateDishById = updateDishById;
module.exports.placeOrder = placeOrder;
