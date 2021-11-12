const { Order, validateUpdate, validate } = require("../mongoModels/orders");
const _ = require("lodash");

createNewOrder = async (req, callback) => {
  let res = {};
  try {
    const result = validate(req.body);
    if (result.error) {
      //   return res.status(400).send(result.error.details[0].message);
      res.status = 400;
      res.data = result.error.details[0].message;
      callback(null, res);
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

    // res.send("Succesfully added orders");
    res.status = 200;
    res.data = "Succesfully added orders";
    callback(null, res);
  } catch (err) {
    console.log("Orders post err: ", err);
  }
};

updateOrder = async (req, callback) => {
  let res = {};
  try {
    const result = validateUpdate(req.body);
    if (result.error) {
      //   return res.status(400).send(result.error.details[0].message);
      res.status = 400;
      res.data = result.error.details[0].message;
      callback(null, res);
    }

    console.log("Order Update: ", req.body);

    const order = await Order.findById(req.body._id);
    order.orderStatus = req.body.orderStatus;

    console.log("Order Updated: ", order);
    await order.save();

    console.log(req.body);
    // res.send("Successfully Updated");
    res.status = 200;
    res.data = "Successfully Updated";
    callback(null, res);
  } catch (err) {
    console.log("UPDATE ORDERS Error: ", err);
    // res.status(500).send("internsl error");
    res.status = 500;
    res.data = "internsl error";
    callback(null, res);
  }
};

getCustomerOrders = async (req, callback) => {
  let res = {};
  try {
    console.log("custId: ", req.user._id);
    let orders = await Order.find({ _custId: req.user._id });
    orders = _.orderBy(orders, ["dateTime"], ["desc"]);
    console.log("OREDRS RETURN cust: ", orders);
    // res.send(orders);
    res.status = 200;
    res.data = orders;
    callback(null, res);
  } catch (err) {
    console.log("Get customer: ", err);
  }
};

getRestaurantOrders = async (req, callback) => {
  let res = {};
  try {
    let orders = await Order.find({
      _restaurantId: req.user._id,
    });
    orders = _.orderBy(orders, ["dateTime"], ["desc"]);
    console.log("OREDRS RETURN: ", orders);
    // res.send(orders);
    res.status = 200;
    res.data = orders;
    callback(null, res);
  } catch (err) {
    console.log("Get customer: ", err);
  }
};

getOrderById = async (req, callback) => {
  let res = {};
  try {
    const order = await Order.findById(req.params.id);
    // res.send(order);
    res.status = 200;
    res.data = order;
    callback(null, res);
  } catch (err) {
    console.log("GET ORDER Error: ", err);
  }
};

function handle_request(msg, callback) {
  console.log(msg);
  if (msg.path === "createNewOrder") {
    createNewOrder(msg, callback);
  } else if (msg.path === "updateOrder") {
    updateOrder(msg, callback);
  } else if (msg.path === "getCustomerOrders") {
    getCustomerOrders(msg, callback);
  } else if (msg.path === "getRestaurantOrders") {
    getRestaurantOrders(msg, callback);
  } else if (msg.path === "getOrderById") {
    getOrderById(msg, callback);
  }
}

exports.handle_request = handle_request;
