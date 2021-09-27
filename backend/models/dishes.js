const con = require("../db");
const Joi = require("joi");

const tableName = "dishes";

class Dishes {
  static findById = async (id) => {
    return new Promise((resolve, reject) => {
      const sql = `select * from ${tableName} where _id = ${id}`;
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("GET dish RESULTS: ", results);
        return resolve(results);
      });
    });
  };

  static findByRestaurantId = async (restaurantId) => {
    return new Promise((resolve, reject) => {
      const sql = `select * from ${tableName} where _restaurantId = ${restaurantId}`;
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("GET Restaurant dishes RESULTS: ", results);
        return resolve(results);
      });
    });
  };

  static updateDishDetails = async ({
    _id,
    _restaurantId,
    name,
    mainIngrediant,
    image,
    price,
    description,
    category,
    type,
  }) => {
    return new Promise((resolve, reject) => {
      const sql = `update ${tableName} set name = '${name}', mainIngrediant = '${mainIngrediant}', image = '${image}', price = '${price}', description = '${description}', category = '${category}', type = '${type}' where _id = ${_id}`;
      console.log("SQL: ", sql);
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("UPDATE Customer RESULTS: ", results);
        return resolve(results);
      });
    });
  };

  static addNewDish = async ({
    _restaurantId,
    name,
    mainIngrediant,
    image,
    price,
    description,
    category,
    type,
  }) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO ${tableName} (_restaurantId, name, mainIngrediant, image, price, description, category, type) VALUES ("${_restaurantId}", "${name}", "${mainIngrediant}", "${image}", "${price}", "${description}", "${category}", "${type}")`;
      console.log("SQL: ", sql);
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("ADD DISHES RESULTS: ", results);
        return resolve(results);
      });
    });
  };

  static deleteDish = async (_dishId) => {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM ${tableName} WHERE _id = '${_dishId}'`;
      console.log("SQL: ", sql);
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("DELETE DISHES RESULTS: ", results);
        return resolve(results);
      });
    });
  };

  static validate = (dish) => {
    const schema = Joi.object({
      _restaurantId: Joi.number().required(),
      name: Joi.string().required(),
      mainIngrediant: Joi.string().required(),
      image: Joi.string().required(),
      price: Joi.number().required(),
      description: Joi.string().required(),
      category: Joi.string().required(),
      type: Joi.string().required(),
    });

    return schema.validate(dish);
  };

  static validateUpdate = (dish) => {
    const schema = Joi.object({
      _id: Joi.number().required(),
      _restaurantId: Joi.number().required(),
      name: Joi.string().required(),
      mainIngrediant: Joi.string().required(),
      image: Joi.string().required(),
      price: Joi.number().required(),
      description: Joi.string().required(),
      category: Joi.string().required(),
      type: Joi.string().required(),
    });

    return schema.validate(dish);
  };
}

module.exports.Dishes = Dishes;
