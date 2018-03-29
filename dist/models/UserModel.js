"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },

  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("User", userSchema);