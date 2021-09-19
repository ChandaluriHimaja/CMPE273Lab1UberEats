const Joi = require("joi");
const bcrypt = require("bcrypt");
const con = require("../db");

class User {
  static addUserDetails = async ({ email, password, isRestaurant = false }) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO user_details (user_email, user_password, isRestaurant) VALUES ("${email}", "${hashedPassword}", "${isRestaurant}")`;
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
    const schema = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      isRestaurant: Joi.boolean(),
    });

    return schema.validate(user);
  };
}

module.exports.User = User;
