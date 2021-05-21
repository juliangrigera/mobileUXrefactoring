const {model, Schema} = require('mongoose')
const {Url} = require('./Url')

const userSchema = new Schema({
    username: String,
    password: String,
    token: String,
    urls: [Url]
})

const User = model('User', userSchema)

module.exports = User