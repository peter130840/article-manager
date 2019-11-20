const express = require('express')
const Router = express.Router()
const userController = require('../controllers/userController')

class usersRouter {
    constructor() {
        this.router = Router
        this.init()
    }

    init() {
        this.router.get('/', userController.getUserDetail)
    }
}

const userRouter = new usersRouter()
module.exports = userRouter.router
