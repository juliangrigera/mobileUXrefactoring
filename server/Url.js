const {model, Schema} = require('mongoose')
const {Refactoring} = require('./Refactoring')

const urlSchema = new Schema({
    url: String,
    refactorings: [Refactoring]
  })

const Url = model('Url', urlSchema)

module.exports = Url