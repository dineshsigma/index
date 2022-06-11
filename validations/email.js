const express = require("express");
const router = express.Router();
const { connection } = require("../db.js");



let emailvalidation = (req, res, next) => {
  const email = req.body.email.trim();

  var sql = "select * from Users where email=?";
  connection.query(sql, [email], (error, results) => {
    if (error) {
      res.status(200).send(error);
    } else {
      if (results.length > 0) {
        res.status(400).send("EMAIL ALREADY USED:PLEASE ENTER ANOTHER EMAIL");
      } else {
        next();
      }
    }
  });
};



module.exports = {
  emailvalidation,
 
};