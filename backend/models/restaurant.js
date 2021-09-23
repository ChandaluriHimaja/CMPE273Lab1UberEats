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
  }) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO ${tableName} (_authId, name, street, city, state, country, zipCode, phoneNumber) VALUES ("${authID}", "${restaurantName}", "${street}", "${city}", "${state}", "${country}", "${zipCode}", "${phoneNumber}")`;
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
}

module.exports.Restaurant = Restaurant;
