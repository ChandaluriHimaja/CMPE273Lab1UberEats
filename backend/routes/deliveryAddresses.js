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

module.exports = router;
