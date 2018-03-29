"use strict";

var User = require("../models/UserModel");
var jwt = require("jwt-simple");

function authentication(request, response, next) {
  // get the token from the header
  var tokenString = request.header("authorization");
  if (!tokenString) {
    return response.send("Invalid credentials");
  }
  var tokenObject = jwt.decode(tokenString, process.env.SECRET);
  // decrypt the token
  // find user by id
  User.findById(tokenObject.userId, function (err, user) {
    if (err) {
      return response.send("Error");
    }
    if (user) {
      request.user = user;
      return next();
    }
    return response.send("Invalid credentials");
  });
}

exports.authentication = authentication;