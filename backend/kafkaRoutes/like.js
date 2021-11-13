const express = require("express");
const router = express.Router();
// const { Like } = require("../models/like");
const { User } = require("../mongoModels/user");
const auth = require("../middleware/auth");
const kafka = require("../kafka/client");

const topicName = "likes1";
// router.get("/:id", async (req, res) => {
//   try {
//     const _custId = req.params.id;
//     const likes = await Like.getCustomerLikes({ _custId });
//     console.log("LIKES: ", likes);
//     res.send(likes);
//   } catch (err) {
//     console.log("GET LIKE: ", err);
//   }
// });

router.post("/", auth, async (req, res) => {
  msg = {};
  msg.path = "toggleLike";
  msg.body = req.body;
  msg.user = req.user;
  kafka.make_request(topicName, msg, (err, results) => {
    res.status(results.status).send(results.data);
  });
  // try {
  //   console.log("User ID: ", req.user._id, " data: ", req.body._restaurantId);
  //   const user = await User.findById(req.user._id);

  //   const index = user.favourites.indexOf(req.body._restaurantId);
  //   console.log("Index: ", index);
  //   if (index == -1) {
  //     user.favourites.push(req.body._restaurantId);
  //     await user.save();
  //     console.log("Added: ", user);
  //     res.send("Added to favourites");
  //   } else {
  //     user.favourites.splice(index, 1);
  //     await user.save();
  //     console.log("Removed: ", user);
  //     res.send("Removed from favourites");
  //   }
  // } catch (err) {
  //   console.log("add like: ", err);
  // }
});

module.exports = router;
