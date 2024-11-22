const {
  createUserWithAddress
} = require("../controllers/userWithAddress/createUserWithAddress");

const {
  getUserWithAddresses
} = require("../controllers/userWithAddress/getUserWithAddresses");
const authenticateToken = require("../middleware/authenticateToken");

var express = require("express");
var router = express.Router();

router.post("/", createUserWithAddress);

router.get("/:id",  getUserWithAddresses);

module.exports = router;
