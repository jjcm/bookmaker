var Image = require('../models/image')

var Page = {
  view: function(req, res, next){
    console.log(req.params.book)
    res.render('page', { title: req.params.book, page: req.params.page});
  },
  getImages: function(req, res, next){
    response = Image.find({book: req.params.id}, function(err, images){
      if(err) { return next(err)}
      res.json(images)
    })
  },
  createImage: function(req, res, next){
    console.log(req.params.page)
  }
}

module.exports = Page
