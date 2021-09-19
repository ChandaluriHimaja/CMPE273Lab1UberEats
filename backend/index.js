const config = require("config");
const auth = require("./routes/auth");
const user = require("./routes/user");
const mysql = require("mysql");
var cors = require("cors");

const express = require("express");
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

var con = mysql.createPool({
  host: config.get("DB.host"),
  user: config.get("DB.username"),
  password: config.get("DB.password"),
  port: config.get("DB.port"),
  database: config.get("DB.database"),
  connectionLimit: 500,
});

con.getConnection((err) => {
  if (err) {
    console.log("Unable to connect to database" + err);
    process.exit(1);
  }
  console.log("Connected to Database");
});

// userData = {
//   username: "Himaja.chandaluri@gmail.com",
//   password: "himaja2199",
//   isRestaurant: false,
// };

// const sql = `INSERT INTO user_details (user_email, user_password, isRestaurant) VALUES ("${userData.username}", "${userData.password}", "${userData.isRestaurant}")`;
// console.log("SQL: ", sql);
// con.query(sql, (error, results) => {
//   if (error) {
//     console.log(error);
//   }
//   console.log("ADD RESULTS: ", results);
// });

app.use(cors());
app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/user", user);

const port = process.env.PORT || config.get("port");
app.listen(port, () => console.log(`Listning to port ${port}.... `));

module.exports.con = con;
