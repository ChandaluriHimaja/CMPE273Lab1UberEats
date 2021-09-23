const Joi = require("joi");
const con = require("../db");

const tableName = "customer";

class Customer {
  static addNewCustomer = async ({ authID, name, phoneNumber }) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO ${tableName} (_authId, nickname, name, phoneNumber) VALUES ("${authID}", "${name}", "${name}", "${phoneNumber}")`;
      console.log("SQL: ", sql);
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("ADD USER RESULTS: ", results);
        return resolve(results);
      });
    });
  };

  static validate = (user) => {
    console.log("VALIDATE USER: ", user);
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      phoneNumber: Joi.number().required(),
      isRestaurant: Joi.number(),
    });

    return schema.validate(user);
  };
}

module.exports.Customer = Customer;
