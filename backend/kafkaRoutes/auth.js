const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const config = require("config");
const { User } = require("../mongoModels/user");
const Joi = require("joi");
const kafka = require("../kafka/client");

router.post("/", async (req, res) => {
  msg = {};
  msg.path = "login";
  msg.body = req.body;
  kafka.make_request("auth", msg, (err, results) => {
    res.status(results.status).send(results.data);
  });
  // try {
  //   const result = validate(req.body);
  //   if (result.error) {
  //     return res.status(400).send(result.error.details[0].message);
  //   }

  //   const { email, password } = req.body;

  //   let user = await User.findOne({ email });
  //   console.log("USER.email", user);
  //   if (!user) return res.status(400).send("Invalid username");

  //   const validPassword = await bcrypt.compare(password, user.password);

  //   if (!validPassword) {
  //     return res.status(400).send("Invalid password");
  //   }

  //   const token = user.generateAuthToken();
  //   console.log("TOKENNNN: ", token);
  //   res.send(token);
  // } catch (err) {
  //   console.log("ERROR: post:auth/ ", err);
  // }
});

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  return schema.validate(user);
}

module.exports = router;
