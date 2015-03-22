var express = require('express');
var router = express.Router();
var multiparty = require('multiparty')
var format = require('util').format
var formidable = require('formidable')
var fs = require('fs-extra')
var Image = require('../models/image')
var PageController = require('../controllers/page')

/* GET home page. */
/*
router.get('/:book', function(req, res, next) {
  console.log('book path')
  PageController.hello()

  res.render('index', { title: 'Express' });
});
*/

router.get('/:book/page/:page', PageController.view)
router.post('/:book/page/:page/createImage', PageController.createImage)

router.post('books/:book', function(req, res, next){
  var form = new multiparty.Form();
  var image
  var title
  var file
  var type


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
});

module.exports = router;
