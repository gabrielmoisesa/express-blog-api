const express = require('express');
const { categoryController } = require('../controllers');
const { auth } = require('../middlewares');

const router = express.Router();

router.get('/', auth.validateJWT, categoryController.get);
router.post('/', auth.validateJWT, categoryController.post);

module.exports = router;