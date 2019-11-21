const Article = require('../models/article')

class articleController {
    constructor() {}

    async createArticle(req, res, next) {
        const article = new Article({
            ...req.body,
            owner: req.user.name,
        })

        try {
            await article.save()
            res.status(201).send(article)
        } catch (e) {
            next(e)
        }
    }
    async updateArticle(req, res, next) {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['subject', 'content']
        const isValidOperation = updates.every(update => {
            return allowedUpdates.includes(update)
        })
        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }

        const _id = req.params.id
        try {
            const article = await Article.findOne({ _id: req.params.id, owner: req.user.name })

            if (!article) {
                return res.status(404).send('no this article')
            }

            updates.forEach(update => {
                article[update] = req.body[update]
            })
            await article.save()
            // const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
            if (!article) {
                return res.status(404).send('article is empty')
            }

            res.send(article)
        } catch (e) {
            next(e)
        }
    }

    async deleteArticle(req, res, next) {
        try {
            const article = await Article.findOneAndDelete({ _id: req.params.id, owner: req.user.name })
            if (!article) {
                res.status(404).send()
            }
            res.send(article)
        } catch (e) {
            next(e)
        }
    }

    async readArticles(req, res, next) {
        const { page = 1, rowPerPage = 10, sortBy = 'createdAt', backward = false } = req.query
        const match = {}
        const sort = {}

        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':')
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        }

        try {
            await req.user
                .populate({
                    path: 'articles',
                    match,
                    options: {
                        limit: parseInt(rowPerPage),
                        skip: (page - 1) * rowPerPage,
                        sort,
                    },
                })
                .execPopulate()
            console.log(req.user)
            res.send(req.user.articles)
        } catch (e) {
            next(e)
        }
    }

    async listArticles(req, res, next) {
        const { page = 1, rowPerPage = 10, sortBy = 'createdAt', backward = false } = req.query
        const sort = {}

        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':')
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        }

        try {
            const articles = await Article.find().setOptions({
                limit: parseInt(rowPerPage),
                skip: (page - 1) * rowPerPage,
                sort,
            })
            res.send(articles)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new articleController()
