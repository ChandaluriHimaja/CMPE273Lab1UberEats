const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { User, validateUserInput } = require("../mongoModels/user");
const bcrypt = require("bcrypt");
const kafka = require("../kafka/client");

router.post("/", async (req, res) => {
  msg = {};
  msg.path = "registerCustomer";
  msg.body = req.body;
  kafka.make_request("customer", msg, (err, results) => {
    res.status(results.status).send(results.data);
  });
  // try {
  //   const result = validateUserInput(req.body);
  //   if (result.error) {
  //     return res.status(400).send(result.error.details[0].message);
  //   }

  //   let user = await User.findOne({ email: req.body.email });
  //   if (user) return res.status(400).send("Username already exists");

  //   const salt = await bcrypt.genSalt(10);
  //   const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //   const address = {
  //     street: req.body.street,
  //     city: req.body.city,
  //     state: req.body.state,
  //     country: req.body.country,
  //     zipCode: req.body.zipCode,
  //   };

  //   user = new User({
  //     email: req.body.email,
  //     password: hashedPassword,
  //     isRestaurant: false,
  //     name: req.body.name,
  //     phoneNumber: req.body.phoneNumber,
  //     picture:
  //       "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
  //     addresses: [address],
  //   });

  //   await user.save();

  //   res.status(200).send("Account created successfully");
  // } catch (err) {
  //   console.log("Error: user add new ", err);
  //   res.status(500);
  // }
});

router.get("/custId/:id", async (req, res) => {
  msg = {};
  msg.id = req.params.id;
  msg.path = "getCustomerById";
  kafka.make_request("customer", msg, (err, results) => {
    res.status(results.status).send(results.data);
  });
  // const customer = await User.findById(req.params.id);
  // if (!customer) {
  //   return res
  //     .status(404)
  //     .send("Customer data with auth credentials was not found");
  // }

  // res.send(customer);
});

router.get("/", auth, async (req, res) => {
  msg = {};
  msg.user = req.user;
  msg.path = "getCustomer";
  kafka.make_request("customer", msg, (err, results) => {
    res.status(results.status).send(results.data);
  });
  // const user = await User.findById(req.user._id);
  // if (!user) {
  //   return res
  //     .status(404)
  //     .send("User data with auth credentials was not found");
  // }

  // res.send(user);
});

router.put("/", auth, async (req, res) => {
  msg = {};
  msg.body = req.body;
  msg.path = "updateCustomerData";
  kafka.make_request("customer", msg, (err, results) => {
    res.status(results.status).send(results.data);
  });
  // try {
  //   console.log("USER UPDATE REQ>BODY: ", req.body);
  //   const result = validateUserInput(req.body);
  //   if (result.error) {
  //     return res.status(400).send(result.error.details[0].message);
  //   }

  //   const user = await User.findById(req.body._id);
  //   user.name = req.body.name;
  //   user.nickname = req.body.nickname;
  //   user.dateOfBirth = req.body.dateOfBirth;
  //   user.picture = req.body.picture;
  //   user.phoneNumber = req.body.phoneNumber;
  //   user.about = req.body.about;
  //   user.addresses[0].street = req.body.street;
  //   user.addresses[0].city = req.body.city;
  //   user.addresses[0].state = req.body.state;
  //   user.addresses[0].country = req.body.country;
  //   user.addresses[0].zipCode = req.body.zipCode;

  //   await user.save();

  //   res.send("Successfully updated customer data");
  // } catch (err) {
  //   console.log("Error: Customer Update: ", err);
  //   res.status(500).send("Error occured while updating data");
  // }
});

module.exports = router;
