var db = require('../db')

var Image = db.model('Image', {
  path:   { type: String, required: false},
  size:   { type: Number, required: false},
  date:   { type: Date, required: true, default: Date.now},
  width:  { type: Number, required: false},
  height: { type: Number, required: false},
  left:   { type: Number, required: false},
  top:    { type: Number, required: false},
  xScale: { type: Number, required: false},
  yScale: { type: Number, required: false},
  page:   { type: Number, required: false},
  book:   { type: String, required: false}
})

module.exports = Image
