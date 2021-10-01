const con = require("../db");

const tableName = "deliveryAddresses";

class DeliveryAddresses {
  static checkIfCustomerAddressExists = async ({ _custId }) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ${tableName} where _custId = ${_custId} ORDER BY _id`;
      console.log("SQL: ", sql);
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("CHECK CUSTOMER ADDRESS PRESENT RESULTS: ", results);
        return resolve(results);
      });
    });
  };

  static addCustomerDeliveryAddress = async ({
    _id,
    street,
    city,
    state,
    country,
    zipCode,
  }) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO ${tableName} (_custId, street, city, state, country, zipCode) VALUES ("${_id}", "${street}", "${city}", "${state}", "${country}", "${zipCode}")`;
      console.log("SQL: ", sql);
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("ADD Deliver address RESULTS: ", results);
        return resolve(results);
      });
    });
  };

  static updateCustomerDeliveryAddress = async ({
    _id,
    _deliverAddressesId,
    street,
    city,
    state,
    country,
    zipCode,
  }) => {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE ${tableName} set _custId = "${_id}", street = "${street}", city = "${city}", state = "${state}", country = "${country}", zipCode = "${zipCode}" where _id = ${_deliverAddressesId}`;
      console.log("SQL: ", sql);
      con.query(sql, (error, results) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("UPdate Deliver address RESULTS: ", results);
        return resolve(results);
      });
    });
  };
}

module.exports.DeliveryAddresses = DeliveryAddresses;
