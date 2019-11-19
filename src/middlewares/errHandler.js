'use strict'
var createError = require('http-errors')

class Error {
    constructor() {
        this.errorHandler = this.errorHandler.bind(this)
    }

    errorHandler(err, req, res, next) {
        // catch 404 and forward to error handler
        this.app.use(function(req, res, next) {
            next(createError(404))
        })

        // error handler
        this.app.use(function(err, req, res, next) {
            // set locals, only providing error in development
            res.locals.message = err.message
            res.locals.error = req.app.get('env') === 'development' ? err : {}

            // render the error page
            res.status(err.status || 500)
            res.render('error')
        })
    }
}

module.exports = new Error()
