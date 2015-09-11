var db = require('../db')

var Page = db.model('Page', {
  date:   { type: Date, required: true, default: Date.now},
  xScale: { type: Number, required: false, default: 50},
  yScale: { type: Number, required: false, default: 50},
  zScale: { type: Number, required: false, default: 50},
  book:   { type: String, required: true},
  number: { type: Number, required: true}
})

module.exports = Page
