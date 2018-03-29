"use strict";

var jwt = require("jwt-simple");

function tokenForUser(user) {
  var timestamp = new Date().getTime();
  return jwt.encode({ userId: user.id, iat: timestamp }, process.env.SECRET);
}

exports.tokenForUser = tokenForUser;