var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/bookmaker', function(){
  console.log('mongodb connected')
})

module.exports = mongoose
