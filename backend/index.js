const config = require("config");
// const auth = require("./routes/auth");
// const customer = require("./routes/customer");
// const restaurant = require("./routes/restaurant");
// const dish = require("./routes/dishes");
// const like = require("./routes/like");
// const deliveryAddresses = require("./routes/deliveryAddresses");
// const orders = require("./routes/orders");

const auth = require("./mongoRoutes/auth");
const customer = require("./mongoRoutes/customer");
const restaurant = require("./mongoRoutes/restaurant");
const dish = require("./mongoRoutes/dishes");
const like = require("./mongoRoutes/like");
const deliveryAddresses = require("./mongoRoutes/deliveryAddresses");
const orders = require("./mongoRoutes/orders");

// const auth = require("./kafkaRoutes/auth");
// const customer = require("./kafkaRoutes/customer");
// const restaurant = require("./kafkaRoutes/restaurant");
// const dish = require("./kafkaRoutes/dishes");
// const like = require("./kafkaRoutes/like");
// const deliveryAddresses = require("./kafkaRoutes/deliveryAddresses");
// const orders = require("./kafkaRoutes/orders");

const mongoose = require("mongoose");
// const mysql = require("mysql");
var cors = require("cors");

const express = require("express");
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose
  .connect(
    "mongodb+srv://uberEatsN:uberEatsN@cluster0.yihoh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log("Unable to connect to database: ", err));

// var con = mysql.createPool({
//   host: config.get("DB.host"),
//   user: config.get("DB.username"),
//   password: config.get("DB.password"),
//   port: config.get("DB.port"),
//   database: config.get("DB.database"),
//   connectionLimit: 500,
// });

// con.getConnection((err) => {
//   if (err) {
//     console.log("Unable to connect to database" + err);
//     process.exit(1);
//   }
//   console.log("Connected to Database");
// });

app.use(cors());
app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/customer", customer);
app.use("/api/restaurant", restaurant);
app.use("/api/dish", dish);
app.use("/api/like", like);
app.use("/api/deliveryAddresses", deliveryAddresses);
app.use("/api/orders", orders);

const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");
const schema = require("./graphql/schema");
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

const port = process.env.PORT || config.get("port");
app.listen(port, () => console.log(`Listning to port ${port}.... `));
