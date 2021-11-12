const bcrypt = require("bcrypt");
// const express = require("express");
// const router = express.Router();
const config = require("config");
const { User } = require("../mongoModels/user");
const Joi = require("joi");

login = async (msg, callback) => {
  let res = {};
  try {
    const result = validate(msg.body);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }

    const { email, password } = msg.body;

    let user = await User.findOne({ email });
    console.log("USER.email", user);
    if (!user) {
      res.status = 400;
      res.data = "Invalid username or password";
      // return res.status(400).send("Invalid username");
      callback(null, res);
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      res.status = 400;
      res.data = "Invalid username or password";
      // return res.status(400).send("Invalid password");
      callback(null, res);
    }

    const token = user.generateAuthToken();
    console.log("TOKENNNN: ", token);
    // res.send(token);
    res.status = 200;
    res.data = token;
    callback(null, res);
  } catch (err) {
    console.log("ERROR: post:auth/ ", err);
  }
};

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  return schema.validate(user);
}

function handle_request(msg, callback) {
  console.log(msg);
  if (msg.path === "login") {
    login(msg, callback);
  }
}

exports.handle_request = handle_request;
