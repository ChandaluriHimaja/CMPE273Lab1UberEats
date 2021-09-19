const config = require("config");
const con = require("../db");
const jwt = require("jsonwebtoken");

class Auth {
  static getAuthUserDetails = () => {
    return new Promise((resolve, reject) => {
      con.query("SELECT * from user_details", (error, results) => {
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
      const sql = `select * from user_details WHERE user_email="${email}"`;
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
}

module.exports.Auth = Auth;
