const express = require('express')
const Router = express.Router()
const articleController = require('../controllers/articleController')
const auth = require('../middlewares/auth')

class articlesRouter {
    constructor() {
        this.router = Router
        this.init()
    }

    init() {
        this.router.post('/', auth, articleController.createArticle)
        this.router.patch('/:id', auth, articleController.updateArticle)
        this.router.delete('/:id', auth, articleController.deleteArticle)
        this.router.get('/', auth, articleController.readArticles)
        this.router.get('/listAll', articleController.listArticles)
    }
}

const articleRouter = new articlesRouter()
module.exports = articleRouter.router
