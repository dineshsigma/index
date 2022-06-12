const express = require("express");
const { connection, sessionStore } = require("./db");

let cors = require("cors");
const app = express();

const bodyParser = require("body-parser");

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ type: "application/json" }));

app.use(express.json());

app.use(cors());

require("dotenv").config();



let sessions = require("express-session");
let cookie = require("cookie-parser");
app.use(
  sessions({
    sessionname: "Doctor-app",
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      Secure: true,
      samesite: true,
      path: "/",
      sameSite: "strict",
      Secure: true,
    },
   
  })
);

app.use(cookie(process.env.COOKIE_SECRET));
app.use(bodyParser.json());

connection.connect(function (err) {
  if (!err) {
    console.log("ESTABLISHED THE CONNECTION :DATABASE IS CONNECTED");
  } else {
    console.log("CONNECTION FAILED:DATABASE NOT CONNECTED");
  }
});


//--------------------create paths----------------------//

let signup=require('./api/signup');
app.use('/api/create',signup);




let port=3030;


 app.listen(port, function (error) {
  if (error) throw console.log(error);
  console.log(`SERVER CONNECTED SUCCESSFULLY ON PORT ${port}`);
});




