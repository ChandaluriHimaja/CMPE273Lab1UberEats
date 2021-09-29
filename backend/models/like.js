const con = require("../db");

const tableName = "favorites";

class Like {
  static checkIfCustomerLikedRestaurant = async ({
    _custId,
    _restaurantId,
  }) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ${tableName} where _custId = ${_custId} and _restaurantId = ${_restaurantId}`;
      console.log("SQL: ", sql);
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("ADD LIKE RESULTS: ", results);
        return resolve(results);
      });
    });
  };

  static addCustomerLike = async ({ _custId, _restaurantId }) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO ${tableName} (_custId, _restaurantId) VALUES ("${_custId}", "${_restaurantId}")`;
      console.log("SQL: ", sql);
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("ADD LIKE RESULTS: ", results);
        return resolve(results);
      });
    });
  };

  static removeCustomerLike = async ({ _custId, _restaurantId }) => {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM ${tableName} where _custId = ${_custId} and _restaurantId = ${_restaurantId}`;
      console.log("SQL: ", sql);
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("DELETE LIKE RESULTS: ", results);
        return resolve(results);
      });
    });
  };

  static getCustomerLikes = async ({ _custId }) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ${tableName} where _custId = ${_custId}`;
      console.log("SQL: ", sql);
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("DELETE LIKE RESULTS: ", results);
        return resolve(results);
      });
    });
  };
}

module.exports.Like = Like;
