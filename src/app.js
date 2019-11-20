const express = require('express')
const path = require('path')
require('dotenv').config({ path: './config/dev.env' })
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const articleRouter = require('./routes/articles')
const cors_define = require('../config/cors')
const error = require('./middlewares/errHandler')

class app {
    constructor() {
        this.app = express()
        this.middleware()
        this.routes()
        this.error()
    }
    middleware() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(cors_define)
    }

    routes() {
        this.app.use('/', indexRouter)
        this.app.use('/users', usersRouter)
        this.app.use('/articles', articleRouter)
    }
    error() {
        this.app.use(error.errorHandler)
    }
}

module.exports = new app().app
