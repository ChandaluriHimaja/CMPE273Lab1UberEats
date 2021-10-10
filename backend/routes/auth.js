const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
// const { con } = require("../index");
const config = require("config");
const { Auth } = require("../models/auth");
const Joi = require("Joi");

// router.get("/", async (req, res) => {
//   const data = await Auth.getAuthUserDetails();
//   console.log("DATA: ", data);
//   res.send(JSON.stringify(data));
// });

router.post("/", async (req, res) => {
  try {
    const result = validate(req.body);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }

    const { email, password } = req.body;

    let [user] = await Auth.checkIfUserExists({ email });
    console.log("USER.email", user);
    if (!user) return res.status(400).send("Invalid username");

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).send("Invalid password");
    }

    // if (password != user.password) {
    //   return res.status(400).send("Invalid password");
    // }

    const token = Auth.generateAuthToken({
      _id: user._id,
      email: user.email,
      isRestaurant: user.isRestaurant,
    });

    res.send(token);
  } catch (err) {
    console.log("ERROR: post:auth/ ", err);
  }
});

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  return schema.validate(user);
}

module.exports = router;
