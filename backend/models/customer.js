const Joi = require("joi");
const con = require("../db");

const tableName = "customer";

class Customer {
  static addNewCustomer = async ({
    authID,
    name,
    phoneNumber,
    about,
    dateOfBirth,
    profilePic,
  }) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO ${tableName} (_authId, nickname, name, phoneNumber, about, dateOfBirth, profilePic) VALUES ("${authID}", "${name}", "${name}", "${phoneNumber}", "${about}", "${dateOfBirth}", "${profilePic}")`;
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

  static findById = (customerId) => {
    return new Promise((resolve, reject) => {
      const sql = `select * from ${tableName} where _authId = ${customerId}`;
      console.log("SQL: ", sql);
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("FIND BY ID CUSTOMER RESULTS: ", results);
        return resolve(results);
      });
    });
  };

  static updateCustomerDetails = ({
    _id,
    nickname,
    name,
    dateOfBirth,
    profilePic,
    phoneNumber,
    about,
  }) => {
    console.log(
      "IN UPDATE CUSTOMER PROFILE: ",
      _id,
      nickname,
      name,
      dateOfBirth,
      profilePic,
      phoneNumber,
      about
    );
    return new Promise((resolve, reject) => {
      const sql = `update ${tableName} set name = '${name}', nickname = '${nickname}', dateOfBirth = '${dateOfBirth}', profilePic = '${profilePic}', phoneNumber = '${phoneNumber}', about = '${about}' where _id = ${_id}`;
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

  static validateProfileUpdate = (customer) => {
    const schema = Joi.object({
      _id: Joi.number().required(),
      email: Joi.string().required().email(),
      name: Joi.string().required(),
      phoneNumber: Joi.number().required(),
      nickname: Joi.string(),
      dateOfBirth: Joi.string(),
      profilePic: Joi.string(),
      about: Joi.string(),
    });

    return schema.validate(customer);
  };
}

module.exports.Customer = Customer;
