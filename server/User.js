const {model, Schema} = require('mongoose')

const refactoringSchema = new Schema({
    elements: [String],
    refName: String,
    params: Object
  })

const siteSchema = new Schema({
    url: String,
    refacs: [refactoringSchema]
  })

const userSchema = new Schema({
    username: String,
    password: String,
    token: String,
    sites: [siteSchema]
})

const User = model('User', userSchema)

module.exports = User