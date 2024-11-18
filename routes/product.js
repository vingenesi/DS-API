const express = require('express');
const ProductController = require('../controllers/ProductController');
const router = express.Router();

router.post('/', ProductController.createProducts);
router.get('/', ProductController.getAllProducts);

module.exports = router;