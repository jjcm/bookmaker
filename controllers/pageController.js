var multiparty = require('multiparty')
var fs = require('fs-extra')
var Image = require('../models/imageModel')
var format = require('util').format
var Page = require('../models/pageModel')

var Pages = {
  view: function(req, res, next){
    console.log(req.params.book)
    res.render('page', { title: req.params.book, page: req.params.page});
  },
  getPage: function(req, res, next){
    response = Page.findOne({book: req.params.book, number: req.params.page}, function(err, page){
      if(err) { return next(err) }
      if(page){
        res.json(page)
      }
      else{
        page = new Page({
          book: req.params.book,
          number: req.params.page
        })
        page.save(function(err, page){
          if(err) {return next(err)}
          res.send(page)
        })
      }
    })
  }
}

module.exports = Pages
