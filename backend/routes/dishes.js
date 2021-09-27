const express = require("express");
const router = express.Router();
const { Dishes } = require("../models/dishes");

router.get("/:id", async (req, res) => {
  try {
    const [dish] = await Dishes.findById(req.params.id);
    res.send(dish);
  } catch (err) {
    console.log("get dish");
  }
});

router.post("/", async (req, res) => {
  try {
    const result = Dishes.validateUpdate(req.body);
    if (result.error) {
      return res.status(400).send(result.error.details[0].message);
    }
    const data = req.body;
    await Dishes.updateDishDetails(data);
    res.send("Successfully updated dish data");
  } catch (err) {
    console.log("Update dish: ", err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    console.log("GOT DELETE REQUEST DISH: ", req.params.id);
    await Dishes.deleteDish(req.params.id);
    res.send("Deleted succesfully");
  } catch (err) {
    console.log("Delete dish: ", err);
  }
});

module.exports = router;
