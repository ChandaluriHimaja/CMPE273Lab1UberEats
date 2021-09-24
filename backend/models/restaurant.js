const Joi = require("joi");
const con = require("../db");

const tableName = "restaurant";

class Restaurant {
  static addNewRestaurant = async ({
    authID,
    restaurantName,
    street,
    city,
    state,
    country,
    zipCode,
    phoneNumber,
    description,
    restaurantImg,
    openingTime,
    closingTime,
    pickupMode,
    deliveryMode,
  }) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO ${tableName} (_authId, name, street, city, state, country, zipCode, phoneNumber, description, restaurantImg, openingTime, closingTime, pickupMode, deliveryMode) VALUES ("${authID}", "${restaurantName}", "${street}", "${city}", "${state}", "${country}", "${zipCode}", "${phoneNumber}", "${description}", "${restaurantImg}", "${openingTime}", "${closingTime}", "${pickupMode}", "${deliveryMode}")`;
      console.log("SQL: ", sql);
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("ADD RESTAURANT RESULTS: ", results);
        return resolve(results);
      });
    });
  };

  static findById = (restaurantId) => {
    return new Promise((resolve, reject) => {
      const sql = `select * from ${tableName} where _authId = ${restaurantId}`;
      console.log("SQL: ", sql);
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("FIND BY ID RESTAURANT RESULTS: ", results);
        return resolve(results);
      });
    });
  };

  static updateRestaurantDetails = ({
    _id,
    restaurantName,
    email,
    street,
    city,
    state,
    country,
    zipCode,
    phoneNumber,
    description,
    restaurantImg,
    openingTime,
    closingTime,
    pickupMode,
    deliveryMode,
  }) => {
    return new Promise((resolve, reject) => {
      const sql = `update ${tableName} set name = '${restaurantName}', street = '${street}', city = '${city}', state = '${state}', country = '${country}', zipCode = '${zipCode}', phoneNumber = '${phoneNumber}', description = '${description}', restaurantImg = '${restaurantImg}', openingTime = '${openingTime}', closingTime = '${closingTime}', pickupMode = '${pickupMode}', deliveryMode = '${deliveryMode}' where _id = ${_id}`;
      console.log("SQL: ", sql);
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("ADD RESTAURANT RESULTS: ", results);
        return resolve(results);
      });
    });
  };

  static validate = (restaurant) => {
    const schema = Joi.object({
      restaurantName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      country: Joi.string().required(),
      zipCode: Joi.number().required(),
      phoneNumber: Joi.number().required(),
      isRestaurant: Joi.number(),
    });

    return schema.validate(restaurant);
  };

  static validateProfileUpdate = (restaurant) => {
    const schema = Joi.object({
      _id: Joi.number().required(),
      restaurantName: Joi.string().required(),
      email: Joi.string().required().email(),
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      country: Joi.string().required(),
      zipCode: Joi.number().required(),
      phoneNumber: Joi.number().required(),
      description: Joi.string(),
      restaurantImg: Joi.string().uri(),
      openingTime: Joi.string(),
      closingTime: Joi.string(),
      pickupMode: Joi.boolean(),
      deliveryMode: Joi.boolean(),
    });

    return schema.validate(restaurant);
  };
}

module.exports.Restaurant = Restaurant;
