const {model, Schema} = require('mongoose')

const versionSchema = new Schema({
  name: String,
  description: String,
  qrUrl: String,
  tag: String
})

const refactoringSchema = new Schema({
  refName: String,
  elements: [String],
  params: Object
})

const userSchema = new Schema({
  username: String,
  password: String,
  token: String,
  url: String,
  refactorings: [refactoringSchema]
})

const User = model('User', userSchema)

module.exports = User