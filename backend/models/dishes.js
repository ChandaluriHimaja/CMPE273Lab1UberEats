const con = require("../db");

const tableName = "dishes";

class Dishes {
  static findById = async (id) => {
    return new Promise((resolve, reject) => {
      const sql = `select * from ${tableName} where _restaurantId = ${id}`;
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
}

module.exports.Dishes = Dishes;
