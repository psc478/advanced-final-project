"use strict";

var User = require("../models/UserModel");
var tokenForUser = require("../services/token").tokenForUser;
var hash = require("../services/hash").hash;

function create(req, res, next) {
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password;

  var u = username;
  // If no username or password was supplied return an error
  if (!username || !password) {
    return res.status(422).json({ error: "You must provide an username and password" });
  }
  console.log("Look for a user with the username");
  User.findOne({ username: u }).exec().then(function (existingUser) {
    // If the user exist return an error on sign up
    if (existingUser) {
      console.log("This username is already being used");
      return res.status(422).json({ error: "Username is in use" });
    }
    console.log("This username is free to use");
    saveUser(username, password, function (token) {
      res.json(token);
    });
  }).catch(function (err) {
    return next(err);
  });
}

function saveUser(username, password, done) {
  hash(password, null, function (hashedPassword) {
    // Create a new user with the supplied username, and the hashed password
    var user = new User({ username: username, password: hashedPassword });
    console.log("Saving the user");
    user.save().then(function (u) {
      console.log("User has been saved to database");
      done({ token: tokenForUser(u) });
    });
  });
}

exports.create = create;