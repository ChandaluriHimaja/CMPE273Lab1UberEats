const express = require("express");
const router = express.Router();
const { Orders } = require("../models/orders");
const { OrderItems } = require("../models/orderItems");

router.post("/", async (req, res) => {
  try {
    const { items } = req.body;

    const data = await Orders.addNewOrder(req.body);
    console.log(data);

    await Promise.all(
      items.map(async (item) => {
        await OrderItems.addNewOrderItem({ ...item, _orderId: data.insertId });
      })
    );

    res.send("Succesfully added orders");
  } catch (err) {
    console.log("Orders post err: ", err);
  }
});

router.post("/update", async (req, res) => {
  try {
    await Orders.updateOrder(req.body);
    res.send("Successfully Updated");
  } catch (err) {
    console.log("UPDATE ORDERS Error: ", err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const order = await Orders.getOrderById(req.params.id);
    res.send(order);
  } catch (err) {
    console.log("GET ORDER Error: ", err);
  }
});

router.get("/customer/:id", async (req, res) => {
  try {
    const orders = await Orders.getCustomerOrders({ _custId: req.params.id });

    const ordersAndItems = [];
    await Promise.all(
      orders.map(async (order) => {
        const orderItem = await OrderItems.getOrderItemsInAnOrder({
          _orderId: order._id,
        });
        const newOrdersAndItemsConst = { ...order, orderItems: orderItem };
        ordersAndItems.push(newOrdersAndItemsConst);
      })
    );
    console.log("OREDRS RETURN: ", ordersAndItems);
    res.send(ordersAndItems);
  } catch (err) {
    console.log("Get customer: ", err);
  }
});

router.get("/restaurant/:id", async (req, res) => {
  try {
    const orders = await Orders.getRestaurantOrders({
      _restaurantId: req.params.id,
    });

    const ordersAndItems = [];
    await Promise.all(
      orders.map(async (order) => {
        const orderItem = await OrderItems.getOrderItemsInAnOrder({
          _orderId: order._id,
        });
        const newOrdersAndItemsConst = { ...order, orderItems: orderItem };
        ordersAndItems.push(newOrdersAndItemsConst);
      })
    );
    console.log("OREDRS RETURN: ", ordersAndItems);
    res.send(ordersAndItems);
  } catch (err) {
    console.log("Get customer: ", err);
  }
});

module.exports = router;
