const express = require('express');
const { userController } = require('../controllers');
const { auth } = require('../middlewares');

const router = express.Router();

router.get('/', auth.validateJWT, userController.get);
router.get('/:id', auth.validateJWT, userController.getById);
router.post('/', userController.post);

module.exports = router;