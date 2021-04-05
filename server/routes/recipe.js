const controllers = require('../controllers');
const router = require('express').Router();
const { auth } = require('../utils');

router.get('/', controllers.recipe.get);

router.get('/:id', controllers.recipe.getOne);

router.post('/', controllers.recipe.post.create);

router.post('/:id/like', controllers.recipe.post.like);

router.post('/:id/comments', controllers.recipe.post.comment);

router.put('/:id', controllers.recipe.put);

router.delete('/:id', controllers.recipe.delete);

module.exports = router;