class Error {
    constructor() {
        this.errorHandler = this.errorHandler.bind(this)
    }

    errorHandler(err, req, res, next) {
        console.log(err)

        let resObj = err.message
        let statusCode = err.statusCode
        if (!statusCode) {
            res.status(500).send(err)
        } else {
            res.status(statusCode).send(resObj)
        }
    }
}

module.exports = new Error()
