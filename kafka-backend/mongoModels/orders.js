const mongoose = require("mongoose");
const Joi = require("joi");
const { required } = require("joi");

const orderSchema = new mongoose.Schema({
  _restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  _custId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  _deliveryAddressId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  dateTime: {
    type: Date,
    default: Date.now,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  orderMode: {
    type: String,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
  },
  orderItems: [
    {
      type: new mongoose.Schema({
        _dishId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      }),
    },
  ],
  orderNote: {
    type: String,
  },
});

function validateOrderInput(order) {
  // console.log("Order: ", order);
  const schema = Joi.object({
    _restaurantId: Joi.string().required(),
    _deliveryAddressId: Joi.string().allow(null),
    dateTime: Joi.string(),
    totalPrice: Joi.number().required(),
    orderMode: Joi.string().required(),
    orderStatus: Joi.string().required(),
    orderItems: Joi.array().items({
      _dishId: Joi.string().required(),
      quantity: Joi.number().required(),
      price: Joi.number().required(),
    }),
    orderNote: Joi.string().allow(""),
  });
  return schema.validate(order);
}

function validateOrderUpdateInput(order) {
  const schema = Joi.object({
    _id: Joi.string().required(),
    orderStatus: Joi.string().required(),
  });
  return schema.validate(order);
}

const Order = mongoose.model("Order", orderSchema);

module.exports.orderSchema = orderSchema;
module.exports.validate = validateOrderInput;
module.exports.validateUpdate = validateOrderUpdateInput;
module.exports.Order = Order;
