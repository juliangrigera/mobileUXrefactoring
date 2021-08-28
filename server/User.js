const {model, Schema} = require('mongoose')

const versionSchema = new Schema({
  name: String,
  description: String,
  qrUrl: String,
  tag: String
})

const refactoringSchema = new Schema({
  refName: String,
  elements: [ String ],
  params: Object,
  versions: [ String ]
})

const userSchema = new Schema({
  username: String,
  password: String,
  userToken: String,
  url: String,
  refactorings: [refactoringSchema],
  versions: [versionSchema]
})

const User = model('User', userSchema)
const Version = model('Version', versionSchema)
const Refactoring = model('Refactoring', refactoringSchema)

module.exports = {User, Version, Refactoring}