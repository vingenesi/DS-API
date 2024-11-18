const {
  createUserWithAddress
} = require("../controllers/userWithAddress/createUserWithAddress");

var express = require("express");
var router = express.Router();

router.post("/", createUserWithAddress);

module.exports = router;
