const paramCheck = require('../utilities/paramCheck')
const User = require('../models/user')

class userController {
    constructor() {
        this.registUser = this.registUser.bind(this)
        this.loginUser = this.loginUser.bind(this)
        this.logoutUser = this.logoutUser.bind(this)
        this.logoutAll = this.logoutAll.bind(this)
    }

    async registUser(req, res, next) {
        const user = new User(req.body)
        try {
            paramCheck.ajvCheck(req.body)
            await user.save()
            const token = await user.generateAuthToken()
            res.status(201).send({ user, token })
        } catch (e) {
            next(e)
        }
    }

    async loginUser(req, res, next) {
        try {
            paramCheck.ajvCheck(req.body)
            const user = await User.findByCredentials(req.body.email, req.body.password)
            const token = await user.generateAuthToken()
            res.send({ user, token })
        } catch (e) {
            next(e)
        }
    }

    async logoutUser(req, res, next) {
        try {
            req.user.tokens = req.user.tokens.filter(token => {
                return token.token !== req.token
            })
            await req.user.save()

            res.send('Logged out!')
        } catch (e) {
            next(e)
        }
    }

    async logoutAll(req, res, next) {
        try {
            req.user.tokens = []
            await req.user.save()
            res.send('logged out all device')
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new userController()
