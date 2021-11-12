const { User } = require("../mongoModels/user");

toggleLike = async (req, callback) => {
  res = {};
  try {
    console.log("User ID: ", req.user._id, " data: ", req.body._restaurantId);
    const user = await User.findById(req.user._id);

    const index = user.favourites.indexOf(req.body._restaurantId);
    console.log("Index: ", index);
    if (index == -1) {
      user.favourites.push(req.body._restaurantId);
      await user.save();
      console.log("Added: ", user);
      //   res.send("Added to favourites");
      res.status = 200;
      res.data = "Added to favourites";
      callback(null, res);
    } else {
      user.favourites.splice(index, 1);
      await user.save();
      console.log("Removed: ", user);
      //   res.send("Removed from favourites");
      res.status = 200;
      res.data = "Removed from favourites";
      callback(null, res);
    }
  } catch (err) {
    console.log("add like: ", err);
  }
};

function handle_request(msg, callback) {
  console.log(msg);
  if (msg.path === "toggleLike") {
    toggleLike(msg, callback);
  }
}

exports.handle_request = handle_request;
