const express = require("express");
const router = express.Router();
const { DeliveryAddresses } = require("../models/deliveryAddress");

router.get("/:id", async (req, res) => {
  try {
    const deliveryAddresses =
      await DeliveryAddresses.checkIfCustomerAddressExists({
        _custId: req.params.id,
      });
    res.send(deliveryAddresses);
  } catch (err) {
    console.log("GET delivery addresses: ", err);
  }
});

router.post("/", async (req, res) => {
  console.log("req.body: ", req.body);
  try {
    const deliveryAddress = await DeliveryAddresses.addCustomerDeliveryAddress(
      req.body
    );
    console.log("deliveryAddress: ", deliveryAddress.data);
    res.send(deliveryAddress);
  } catch (err) {
    console.log("ADD delivery address: ", err);
  }
});

module.exports = router;
