const paramCheck = require('../utilities/paramCheck')

class userController {
    constructor() {
        this.getUserDetail = this.getUserDetail.bind(this)
    }

    async registerUser(req, res, next) {
        try {
            paramCheck.ajvCheck(req.query)
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
