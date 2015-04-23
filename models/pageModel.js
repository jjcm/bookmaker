var db = require('../db')

var Page = db.model('Page', {
  date:   { type: Date, required: true, default: Date.now},
  xScale: { type: Number, required: false},
  yScale: { type: Number, required: false},
  number: { type: Number, required: false}
})

module.exports = Page
