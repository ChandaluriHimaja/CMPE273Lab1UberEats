const con = require("../db");

const tableName = "orderItems";

class OrderItems {
  static addNewOrderItem = async ({ _orderId, _dishId, quantity }) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO ${tableName} (_orderId, _dishId, quantity) VALUES ("${_orderId}","${_dishId}", "${quantity}")`;
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

  static getOrderItemsInAnOrder = async ({ _orderId }) => {
    return new Promise((resolve, reject) => {
      const sql = `select * from ${tableName} where _orderId = ${_orderId}`;
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

module.exports.OrderItems = OrderItems;
