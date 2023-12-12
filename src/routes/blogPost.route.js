const express = require('express');
const { blogPostController } = require('../controllers');
const { auth } = require('../middlewares');

const router = express.Router();

router.get('/', auth.validateJWT, blogPostController.get);
router.get('/search', auth.validateJWT, blogPostController.getByQuery);
router.get('/:id', auth.validateJWT, blogPostController.getById);
router.post('/', auth.validateJWT, auth.userIdFromToken, blogPostController.post);
router.put('/:id', auth.validateJWT, auth.userIdFromToken, auth.postAuthor, blogPostController.put);
router.delete(
  '/:id',
  auth.validateJWT,
  auth.userIdFromToken,
  auth.postAuthor,
  blogPostController.deleteById,
);

module.exports = router;