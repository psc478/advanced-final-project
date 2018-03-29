"use strict";

var express = require("express");

var _require = require("../controllers/UserController"),
    create = _require.create;

var router = express.Router();

router.post("/users", create);

module.exports = router;