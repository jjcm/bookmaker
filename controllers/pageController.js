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
  },
  test: function(req, res, next){
    var type
    var file = req.files.file
    console.log('test')
    console.log(req.body)

    console.log(file.type)
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

    /*
    image = new Image({
    page: 1,
    book: book
    })

    image.path = "/images/" + image._id + type

    image.save(function(err, post){
    if(err) {return next(err)}
    console.log("saved!")
    fs.copy(file.path, "./public" + image.path, function(){
        console.log("copied!")
        res.send(format('\nuploaded %s (%d Kb) as %s\n<img src="%s"/>', file.originalFilename, file.size / 1024 | 0, title, image.path))
    })
    })
    console.log(image)
    */
    res.send(file.path)
  },
  createImage: function(req, res, next){
    console.log("#####################################################################")
    var form = new multiparty.Form();
    var image
    var title
    var file
    var type
    console.log(req.params)
    console.log(req.body)
    
    form.on('error', next)
    form.on('close', function(){
        switch(file.headers['content-type']){
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
        page: 1,
        book: book
        })


        image.path = "/images/" + image._id + type

        image.save(function(err, post){
        if(err) {return next(err)}
        console.log("saved!")
        fs.copy(file.path, "./public" + image.path, function(){
            console.log("copied!")
            res.send(format('\nuploaded %s (%d Kb) as %s\n<img src="%s"/>', file.originalFilename, file.size / 1024 | 0, title, image.path))
        })
        })
        console.log(image)
    })

    form.on('field', function(name, val){
        if(name == 'title'){
        title = val
        console.log("TITLE SET")
        }
        if(name == 'book'){
        book = val
        console.log("book SET")
        }
    })

    form.on('progress', function(received, expected){
        var percent = (received / expected) * 100 || 0
        //console.log('uploading: ' + percent)
    })

    form.on('file', function(name, f){
        file = f
    })

    form.parse(req)
  }
}

module.exports = Pages
