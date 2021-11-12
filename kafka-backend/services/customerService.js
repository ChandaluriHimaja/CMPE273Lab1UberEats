// const express = require("express");
// const router = express.Router();
const auth = require("../middleware/auth");
const { User, validateUserInput } = require("../mongoModels/user");
const bcrypt = require("bcrypt");

registerCustomer = async (req, callback) => {
  let res = {};
  try {
    const result = validateUserInput(req.body);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("Username already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const address = {
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      zipCode: req.body.zipCode,
    };

    user = new User({
      email: req.body.email,
      password: hashedPassword,
      isRestaurant: false,
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      picture:
        "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
      addresses: [address],
    });

    await user.save();

    res.status = 200;
    res.data = "Account created successfully";
    // res.status(200).send("Account created successfully");
    callback(null, res);
  } catch (err) {
    console.log("Error: user add new ", err);
    // res.status(500);
    res.status = 500;
    res.data("Internal error: ", err);
    callback(null, res);
  }
};

getCustomerById = async (req, callback) => {
  let res = {};
  const customer = await User.findById(req.id);
  if (!customer) {
    // return res
    //   .status(404)
    //   .send("Customer data with auth credentials was not found");
    res.status = 404;
    res.data = "Customer data with auth credentials was not found";
    callback(null, res);
  }

  //   res.send(customer);
  res.status = 200;
  res.data = customer;
  callback(null, res);
};

getCustomer = async (req, callback) => {
  let res = {};
  const user = await User.findById(req.user._id);
  if (!user) {
    // return res
    //   .status(404)
    //   .send("User data with auth credentials was not found");
    res.status = 404;
    res.data = "User data with auth credentials was not found";
    callback(null, res);
  }

  // res.send(user);
  res.status = 200;
  res.data = user;
  callback(null, res);
};

updateCustomerData = async (req, callback) => {
  let res = {};
  try {
    console.log("USER UPDATE REQ>BODY: ", req.body);
    const result = validateUserInput(req.body);
    if (result.error) {
      // return res.status(400).send(result.error.details[0].message);
      res.status = 400;
      res.data = result.error.details[0].message;
      callback(null, res);
    }

    const user = await User.findById(req.body._id);
    user.name = req.body.name;
    user.nickname = req.body.nickname;
    user.dateOfBirth = req.body.dateOfBirth;
    user.picture = req.body.picture;
    user.phoneNumber = req.body.phoneNumber;
    user.about = req.body.about;
    user.addresses[0].street = req.body.street;
    user.addresses[0].city = req.body.city;
    user.addresses[0].state = req.body.state;
    user.addresses[0].country = req.body.country;
    user.addresses[0].zipCode = req.body.zipCode;

    await user.save();

    // res.send("Successfully updated customer data");
    res.status = 200;
    res.data = "Successfully updated customer data";
    callback(null, res);
  } catch (err) {
    console.log("Error: Customer Update: ", err);
    // res.status(500).send("Error occured while updating data");
    res.status = 500;
    res.data = "Error occured while updating data";
    callback(null, res);
  }
};

function handle_request(msg, callback) {
  console.log(msg);
  if (msg.path === "registerCustomer") {
    registerCustomer(msg, callback);
  } else if (msg.path === "getCustomerById") {
    getCustomerById(msg, callback);
  } else if (msg.path === "getCustomer") {
    getCustomer(msg, callback);
  } else if (msg.path === "updateCustomerData") {
    updateCustomerData(msg, callback);
  }
}

exports.handle_request = handle_request;
