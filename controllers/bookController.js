var Book = require('../models/bookModel')
var Page = require('../models/pageModel')
var Books = {
  getBook: function(req, res, next){
    response = Book.findOne({shortName: req.params.id}, function(err, book){
      if(err) { return next(err) }
      if(book){
        Page.find({book: req.params.id}, function(err, pages){
          if(err) return next(err)
          book.pages = pages
          console.log(book)
          res.json(book)
        })
      }
      else{
        book = new Book({
          shortName: req.params.id,
          name: req.params.id,
          pages: []
        })
        book.save(function(err, post){
          if(err) {return next(err)}
          res.send(book)
        })
      }
    })
  }
}

module.exports = Books
