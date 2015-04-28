var Image = require('../models/imageModel')
var multiparty = require('multiparty')
var fs = require('fs-extra')
var format = require('util').format

var Images = {
  getImage: function(req, res, next){
    response = Image.find({page: req.params.id}, function(err, image){
      if(err) { return next(err) }
      res.json(image)
    })
  },
  getImages: function(req, res, next){
    response = Image.find({page: req.params.page, book: req.params.book}, function(err, images){
      if(err) { return next(err)}
      res.json(images)
    })
  },
  create: function(req, res, next){
    var type
    var file = req.files.file
    switch(file.type){
    case "image/jpeg":
        type = ".jpg"
        break
    case "image/gif":
        type = ".gif"
        break
    case "image/png":
        type = ".png"
        break
    }

    image = new Image({
      page: req.body.page,
      book: req.body.book,
      name: file.originalFilename.slice(0, -4)
    })

    console.log(image)

    image.path = format("/images/book/%s/%s/%s%s", image.book, image.page, image._id, type)

    console.log(image.path)
    image.save(function(err, post){
      if(err) {return next(err)}
      console.log("saved!")
      fs.move(file.path, "./public" + image.path, function(){
          console.log("copied!")
          res.json(image)
      })
    })
  },
  update: function(req, res, next){
    if(req.body._id)
      Image.findOneAndUpdate({_id: req.body._id}, {depth: req.body.depth}, function(err, image){
        if(err) { return next(err)}
        console.log("Image " + image._id + " (" + image.book + " page " + image.page + ") has been updated with depth " + image.depth)
      })
  },
  remove: function(req, res, next){
    if(req.body._id)
      Image.findOneAndRemove({_id: req.body._id}, function(err, image){
        if(err) { return next(err)}
        console.log("Image " + req.body._id + " (" + req.body.book + " page " + req.body.page + ") has been deleted")
      })
  },
}

module.exports = Images
