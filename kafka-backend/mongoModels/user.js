const config = require("config");
const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  isRestaurant: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
  },
  picture: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  phoneNumber: {
    type: Number,
    minlength: 10,
    maxlength: 12,
  },
  about: {
    type: String,
  },
  addresses: {
    type: [
      new mongoose.Schema({
        street: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 500,
        },
        city: {
          type: String,
          required: true,
          minlength: 2,
          maxlength: 50,
        },
        state: {
          type: String,
          required: true,
          minlength: 2,
          maxlength: 100,
        },
        country: {
          type: String,
          required: true,
          minlength: 2,
          maxlength: 50,
        },
        zipCode: {
          type: Number,
          required: true,
          minlength: 5,
          maxlength: 10,
        },
      }),
    ],
  },
  openingTime: {
    type: String,
  },
  closingTime: {
    type: String,
  },
  pickupMode: {
    type: Boolean,
  },
  deliveryMode: {
    type: Boolean,
  },
  favourites: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  dishes: {
    type: [
      new mongoose.Schema({
        name: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 500,
        },
        mainIngrediant: {
          type: String,
          required: true,
          minlength: 1,
          maxlength: 50,
        },
        image: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 200,
        },
        price: {
          type: Number,
          required: true,
        },
        description: {
          type: String,
        },
        category: {
          type: String,
        },
        type: {
          type: String,
        },
      }),
    ],
  },
  orders: {
    type: [mongoose.Schema.Types.ObjectId],
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      isRestaurant: this.isRestaurant,
    },
    "1234"
    // config.get("jwtPrivateKey")
  );
  return token;
};

function validateUserInput(user) {
  const schema = Joi.object({
    _id: Joi.string(),
    password: Joi.string(),
    deliveryAddressId: Joi.string(),
    email: Joi.string().required().email(),
    isRestaurant: Joi.boolean(),
    name: Joi.string().required(),
    nickname: Joi.string(),
    picture: Joi.string(),
    dateOfBirth: Joi.string().allow(""),
    phoneNumber: Joi.number().required(),
    about: Joi.string(),
    street: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    country: Joi.string(),
    zipCode: Joi.string(),
    openingTime: Joi.string(),
    closingTime: Joi.string(),
    pickupMode: Joi.boolean(),
    deliveryMode: Joi.boolean(),
  });

  return schema.validate(user);
}

function validateDishInput(dish) {
  const schema = Joi.object({
    _id: Joi.string(),
    name: Joi.string().required(),
    mainIngrediant: Joi.string().required(),
    image: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    type: Joi.string().required(),
  });

  return schema.validate(dish);
}

const User = mongoose.model("User", userSchema);

module.exports.userSchema = userSchema;
module.exports.validateUserInput = validateUserInput;
module.exports.validateDishInput = validateDishInput;
module.exports.User = User;
