const express = require("express");
const router = express.Router();
const { Customer } = require("../models/customer");
const { Auth } = require("../models/auth");
const { DeliveryAddresses } = require("../models/deliveryAddress");

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

    await Customer.addNewCustomer({
      authID: auth._id,
      name,
      phoneNumber,
      about: "",
      dateOfBirth: "",
      profilePic:
        "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
    });
    res.status(200).send("Account created successfully");
  } catch (err) {
    console.log("Error: user add new ", err);
  }
});

router.get("/:id", async (req, res) => {
  const [customer] = await Customer.findById(req.params.id);
  if (!customer) {
    return res
      .status(404)
      .send("Customer data with auth credentials was not found");
  }

  res.send(customer);
});

router.get("/custId/:id", async (req, res) => {
  const [customer] = await Customer.findByCustomerId(req.params.id);
  if (!customer) {
    return res
      .status(404)
      .send("Customer data with auth credentials was not found");
  }

  res.send(customer);
});

router.post("/update", async (req, res) => {
  try {
    const result = Customer.validateProfileUpdate(req.body);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }

    const data = req.body;

    await Customer.updateCustomerDetails(data);

    if (data.street) {
      const [deliveryAddress] =
        await DeliveryAddresses.checkIfCustomerAddressExists({
          _custId: data._id,
        });

      if (deliveryAddress) {
        await DeliveryAddresses.updateCustomerDeliveryAddress({
          ...data,
          _deliverAddressesId: deliveryAddress._id,
        });
        console.log("UPDATING DELIVER ADDRESS");
      } else {
        await DeliveryAddresses.addCustomerDeliveryAddress(data);
        console.log("ADDING DELIVER ADDRESS");
      }
    }

    res.send("Successfully updated customer data");
  } catch (err) {
    console.log("Error: Customer Update: ", err);
  }
});

module.exports = router;
