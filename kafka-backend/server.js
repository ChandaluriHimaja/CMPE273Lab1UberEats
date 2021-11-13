var connection = new require("./kafka/Connection");

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://uberEatsN:uberEatsN@cluster0.yihoh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log("Unable to connect to database: ", err));

// var authService = require("./services/Auth/authService.js");
// var postService = require("./services/Post/postService");

let authService = require("./services/authService");
let customerService = require("./services/customerService");
let deliveryDeliveryAddessService = require("./services/deliveryAddressesService");
let dishesService = require("./services/dishesService");
let likesService = require("./services/likesService");
let ordersService = require("./services/ordersService");
let restaurantService = require("./services/restaurantService");

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function (message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function (err, res) {
      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, function (err, data) {
        console.log("producer send  = ", data);
      });
      return;
    });
  });
}

// handleTopicRequest("getTopic", authService);
// handleTopicRequest("postTopic", postService);
handleTopicRequest("auth1", authService);
handleTopicRequest("customer1", customerService);
handleTopicRequest("deliveryAddress1", deliveryDeliveryAddessService);
handleTopicRequest("dishes1", dishesService);
handleTopicRequest("likes1", likesService);
handleTopicRequest("orders1", ordersService);
handleTopicRequest("restaurant1", restaurantService);
