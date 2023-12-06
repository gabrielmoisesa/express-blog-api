const express = require('express');
const { categoryController } = require('../controllers');
const { auth } = require('../middlewares');

const router = express.Router();

router.post('/', auth.validateJWT, categoryController.post);

module.exports = router;