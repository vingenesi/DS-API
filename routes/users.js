const { createUser } = require("../controllers/user/createUser");
const { deleteUser } = require("../controllers/user/deleteUser");
const { getAllUsers } = require("../controllers/user/getAllUsers");
const { getIdUser } = require("../controllers/user/getIdUser");
const { loginUser } = require("../controllers/user/loginUser");
const {
  getUserWithAddresses
} = require("../controllers/user/getUserWithAddresses");

var express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
var router = express.Router();

router.get("/:id/addresses", authenticateToken, getUserWithAddresses);

router.get("/:id", getIdUser);

router.delete("/:id", deleteUser);

router.get("/", getAllUsers);

//router.post("/", authenticateToken, createUser);

router.post("/login", loginUser);

module.exports = router;
