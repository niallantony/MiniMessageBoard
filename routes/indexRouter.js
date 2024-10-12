const { Router } = require("express");
const { indexController, showMessage } = require('../controller/indexController');

const indexRouter = Router();

indexRouter.get('/', indexController);
indexRouter.get('/message/:messageID', showMessage)

module.exports = indexRouter;