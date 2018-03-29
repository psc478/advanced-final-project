"use strict";

var express = require("express");

var _require = require("../controllers/SessionController"),
    create = _require.create;

var router = express.Router();

router.post("/sessions", create);

module.exports = router;