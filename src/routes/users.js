const express = require('express')
const Router = express.Router()
const userController = require('../controllers/userController')
const auth = require('../middlewares/auth')

class usersRouter {
    constructor() {
        this.router = Router
        this.init()
    }

    init() {
        this.router.post('/', userController.registUser)
        this.router.post('/login', userController.loginUser)
        this.router.post('/logout', auth, userController.logoutUser)
        this.router.post('/logoutAll', auth, userController.logoutAll)
    }
}

const userRouter = new usersRouter()
module.exports = userRouter.router
