const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const paramCheck = require('../utilities/paramCheck')
//const Article = require('./article')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 6,
            validate(value) {
                if (value.includes('password')) {
                    throw new Error('include password')
                }
            },
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
                paramCheck.ajvCheck(value)
            },
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
)

// userSchema.virtual('articles', {
//     ref: 'Articles',
//     localField: '_id',
//     foreignField: 'owner',
// })

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

userSchema.pre('save', async function(next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// Delete user article when user is removed
// userSchema.pre('remove', async function(next) {
//     const user = this
//     await Article.deleteMany({ owner: user._id })
//     next()
// })

const User = mongoose.model('User', userSchema)

module.exports = User
