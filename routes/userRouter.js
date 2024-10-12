const { Router } = require("express");
const userController = require('../controller/userController');

const router = new Router();

router.get('/', userController.usersGet);
router.get('/new', userController.newUserGet);
router.post('/new', userController.newUserPost);

module.exports = router;