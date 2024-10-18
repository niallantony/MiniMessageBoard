const { Router } = require("express");
const userController = require('../controller/userController');

const router = new Router();

router.get('/', userController.usersGet);
router.get('/new', userController.newUserGet);
router.post('/new', userController.newUserPost);
router.get('/:id/update', userController.userUpdateGet)
router.post('/:id/update', userController.userUpdatePost)
router.get('/:id/delete', userController.userDelete)

module.exports = router;