const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema(
    {
        subject: {
            type: String,
            require: true,
        },
        content: {
            type: String,
            default: 'no content!',
        },
        owner: {
            type: String,
            require: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
)

const Article = mongoose.model('Articles', articleSchema)

module.exports = Article
