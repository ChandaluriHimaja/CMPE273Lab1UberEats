const con = require("../db");

const tableName = "orders";

class Orders {
  static addNewOrder = async ({
    _custId,
    _restaurantId,
    _deliveryAddressId,
    dateTime,
    totalPrice,
    orderMode,
    orderStatus,
  }) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO ${tableName} (_custId, _restaurantId, _deliveryAddressId, dateTime, totalPrice, orderMode, orderStatus) VALUES ("${_custId}", "${_restaurantId}", "${_deliveryAddressId}", "${dateTime}", "${totalPrice}", "${orderMode}", "${orderStatus}")`;
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

  static updateOrder = async ({ _id, orderStatus }) => {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE ${tableName} SET orderStatus = "${orderStatus}" WHERE _id = ${_id}`;
      console.log("SQL: ", sql);
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("UPDATE ORDER RESULTS: ", results);
        return resolve(results);
      });
    });
  };

  static getOrderById = async (id) => {
    return new Promise((resolve, reject) => {
      const sql = `select * from ${tableName} where _id = ${id}`;
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("GET Customer orders RESULTS: ", results);
        return resolve(results);
      });
    });
  };

  static getCustomerOrders = async ({ _custId }) => {
    return new Promise((resolve, reject) => {
      const sql = `select * from ${tableName} where _custId = ${_custId} ORDER BY dateTime desc`;
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("GET Customer orders RESULTS: ", results);
        return resolve(results);
      });
    });
  };

  static getRestaurantOrders = async ({ _restaurantId }) => {
    return new Promise((resolve, reject) => {
      const sql = `select * from ${tableName} where _restaurantId = ${_restaurantId} ORDER BY dateTime desc`;
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("GET Customer orders RESULTS: ", results);
        return resolve(results);
      });
    });
  };
}

module.exports.Orders = Orders;
