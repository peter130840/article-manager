const paramCheck = require('../utilities/paramCheck')
const User = require('../models/user')

class userController {
    constructor() {
        this.getUserDetail = this.getUserDetail.bind(this)
        this.registUser = this.registUser.bind(this)
    }

    async registUser(req, res, next) {
        const user = new User(req.body)
        console.log(user)
        try {
            paramCheck.ajvCheck(req.body)
            await user.save()
            const token = await user.generateAuthToken()
            res.status(201).send({ user, token })
        } catch (e) {
            next(e)
        }
    }

    async getUserDetail(req, res, next) {
        try {
            paramCheck.ajvCheck(req.query)
            res.send('test')
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new userController()
