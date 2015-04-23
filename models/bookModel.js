var db = require('../db')

var Book = db.model('Book', {
  date:      { type: Date, required: true, default: Date.now},
  shortName: { type: String, required: true, unique: true},
  name:      { type: String, required: true, unique: true}
})

module.exports = Book
