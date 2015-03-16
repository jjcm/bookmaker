var express = require('express');
var router = express.Router();
var multiparty = require('multiparty')
var format = require('util').format
var formidable = require('formidable')
var fs = require('fs-extra')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next){
  var form = new multiparty.Form();
  var image
  var title
  var file


  form.on('error', next)
  form.on('close', function(){
    console.log("name = " + file.originalFilename)
    console.log("file = " + file.size / 1024)
    console.log(image)
    fs.copy(file.path, "./public/images/" + "hi.jpg", function(){
      console.log("copied!")
      res.send(format('\nuploaded %s (%d Kb) as %s\n<img src="%s"/>', file.originalFilename, file.size / 1024 | 0, title, "images/hi.jpg"))
    })
    
  })

  form.on('field', function(name, val){
    if(name !== 'title') return
    title = val
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
