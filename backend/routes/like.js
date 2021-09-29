const express = require("express");
const router = express.Router();
const { Like } = require("../models/like");

router.get("/:id", async (req, res) => {
  try {
    const _custId = req.params.id;
    const likes = await Like.getCustomerLikes({ _custId });
    console.log("LIKES: ", likes);
    res.send(likes);
  } catch (err) {
    console.log("GET LIKE: ", err);
  }
});

router.post("/", async (req, res) => {
  try {
    const [like] = await Like.checkIfCustomerLikedRestaurant(req.body);
    if (like) {
      await Like.removeCustomerLike(req.body);
      console.log("Disliked");
      res.send("Succesfully disliked");
    } else {
      await Like.addCustomerLike(req.body);
      console.log("Liked");
      res.send("Succesfully liked");
    }
  } catch (err) {
    console.log("add like: ", err);
  }
});

module.exports = router;
