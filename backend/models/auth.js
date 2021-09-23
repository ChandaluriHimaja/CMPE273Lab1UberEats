const config = require("config");
const con = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const tableName = "auth";

class Auth {
  static getAuthUserDetails = () => {
    return new Promise((resolve, reject) => {
      con.query(`select * from ${tableName}`, (error, results) => {
        if (error) {
          return reject(error);
        }
        console.log("GET RESULTS: ", results);
        return resolve(results);
      });
    });
  };

  static generateAuthToken = ({ _id, email, isRestaurant }) => {
    const token = jwt.sign(
      {
        _id,
        email,
        isRestaurant,
      },
      config.get("jwtPrivateKey")
    );
    console.log("TOKEN: ", token);
    return token;
  };

  static checkIfUserExists = ({ email }) => {
    return new Promise((resolve, reject) => {
      const sql = `select * from ${tableName} WHERE email="${email}"`;
      console.log("SQL: ", sql);
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("USER EXISTS RESULTS: ", results);
        return resolve(results);
      });
    });
  };

  static addAuthDetails = async ({ email, password, isRestaurant }) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO ${tableName} (email, password, isRestaurant) VALUES ("${email}", "${hashedPassword}", "${isRestaurant}")`;
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("ADD AUTH DETAILS: ", results);
        return resolve(results);
      });
    });
  };
}

module.exports.Auth = Auth;
