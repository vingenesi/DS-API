const express = require("express");
const router = express.Router();
const {
  finalizaCompra
} = require("../controllers/finalizaCompra/finalizaCompra");

/* GET home page. */
router.post("/", finalizaCompra);

module.exports = router;
