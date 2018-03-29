"use strict";

var express = require("express");

var _require = require("../controllers/AuthenticationController"),
    authentication = _require.authentication;

var router = express.Router();

router.use(authentication);

module.exports = router;