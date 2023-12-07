const express = require('express');
const { blogPostController } = require('../controllers');
const { auth } = require('../middlewares');

const router = express.Router();

router.get('/', auth.validateJWT, blogPostController.get);
router.post('/', auth.validateJWT, auth.userIdFromToken, blogPostController.post);

module.exports = router;