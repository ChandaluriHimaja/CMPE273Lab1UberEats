const express = require("express");
const router = express.Router();
// const { Orders } = require("../models/orders");
// const { OrderItems } = require("../models/orderItems");
const auth = require("../middleware/auth");
const restaurant = require("../middleware/restaurant");
const { Order, validateUpdate, validate } = require("../mongoModels/orders");
const _ = require("lodash");

router.post("/", auth, async (req, res) => {
  try {
    const result = validate(req.body);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }

    console.log("order: ", req.body);

    const orderItems = [];

    req.body.orderItems.forEach((orderItem) => {
      const item = {
        _dishId: orderItem._dishId,
        quantity: orderItem.quantity,
        price: orderItem.price,
      };
      orderItems.push(item);
    });

    const order = new Order({
      _restaurantId: req.body._restaurantId,
      _custId: req.user._id,
      _deliveryAddressId: req.body._deliveryAddressId,
      dateTime: req.body.dateTime,
      totalPrice: req.body.totalPrice,
      orderMode: req.body.orderMode,
      orderStatus: req.body.orderStatus,
      orderItems: orderItems,
      orderNote: req.body.orderNote,
    });

    console.log("order: ", order._restaurantId);

    await order.save();

    res.send("Succesfully added orders");
  } catch (err) {
    console.log("Orders post err: ", err);
  }
});

router.put("/", auth, async (req, res) => {
  try {
    const result = validateUpdate(req.body);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }

    console.log("Order Update: ", req.body);

    const order = await Order.findById(req.body._id);
    order.orderStatus = req.body.orderStatus;

    console.log("Order Updated: ", order);
    await order.save();

    console.log(req.body);
    res.send("Successfully Updated");
  } catch (err) {
    console.log("UPDATE ORDERS Error: ", err);
    res.status(500).send("internsl error");
  }
});

router.get("/customer", auth, async (req, res) => {
  try {
    console.log("custId: ", req.user._id);
    let orders = await Order.find({ _custId: req.user._id });
    orders = _.orderBy(orders, ["dateTime"], ["desc"]);
    console.log("OREDRS RETURN cust: ", orders);
    res.send(orders);
  } catch (err) {
    console.log("Get customer: ", err);
  }
});

router.get("/restaurant", auth, restaurant, async (req, res) => {
  try {
    let orders = await Order.find({
      _restaurantId: req.user._id,
    });
    orders = _.orderBy(orders, ["dateTime"], ["desc"]);
    console.log("OREDRS RETURN: ", orders);
    res.send(orders);
  } catch (err) {
    console.log("Get customer: ", err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.send(order);
  } catch (err) {
    console.log("GET ORDER Error: ", err);
  }
});

module.exports = router;
