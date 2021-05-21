const {model, Schema} = require('mongoose')

const refactoringSchema = new Schema({
    elements: [String],
    refactoring: String,
    params: Object
  })

const Refactoring = model('Refactoring', refactoringSchema)

module.exports = Refactoring