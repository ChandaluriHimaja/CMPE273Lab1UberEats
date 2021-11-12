const { User } = require("../mongoModels/user");

addDeliveryAddress = async (req, callback) => {
  let res = {};
  try {
    const user = await User.findById(req.user._id);
    const address = {
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      zipCode: req.body.zipCode,
    };
    user.addresses.push(address);
    await user.save();
    res.status = 200;
    res.data = "Address Added successfully";
    callback(null, res);
    // res.send("Address Added successfully");
  } catch (err) {
    console.log("ADD delivery address: ", err);
  }
};

function handle_request(msg, callback) {
  console.log(msg);
  if (msg.path === "addDeliveryAddress") {
    addDeliveryAddress(msg, callback);
  }
}

exports.handle_request = handle_request;
