const { Router } = require("express")
const newController = require('../controller/newController')

const newRouter = Router();

newRouter.get("/", newController.get);
newRouter.post("/", newController.post)

module.exports = newRouter;