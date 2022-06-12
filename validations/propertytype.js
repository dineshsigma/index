const express = require("express");
const router = express.Router();
const { connection } = require("../db.js");



let propertyvalidation = (req, res, next) => {
  const propertytype = req.body.propertytype;

  var sql = "select * from propertyType where propertytype=?";
  connection.query(sql, [propertytype], (error, results) => {
    if (error) {
      res.status(200).send(error);
    } else {
      if (results.length > 0) {
        res.status(400).send("Property name is already exist");
      } else {
        next();
      }
    }
  });
};



module.exports = {
    propertyvalidation,
 
};