const express = require("express");
const router = express.Router();
const { Customer } = require("../models/customer");
const { Auth } = require("../models/auth");

router.post("/", async (req, res) => {
  try {
    const result = Customer.validate(req.body);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }

    const { name, email, password, phoneNumber, isRestaurant } = req.body;

    let [user] = await Auth.checkIfUserExists({ email });
    if (user) return res.status(400).send("Username already exists");

    await Auth.addAuthDetails({
      email,
      password,
      isRestaurant: 0,
    });

    let [auth] = await Auth.checkIfUserExists({ email });
    console.log("AUTH: ", auth);

    await Customer.addNewCustomer({ authID: auth._id, name, phoneNumber });
    res.status(200).send("Account created successfully");
  } catch (err) {
    console.log("Error: user add new ", err);
  }
});

module.exports = router;
