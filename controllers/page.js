var Page = {
  hello: function(req, res, next){
    console.log('ayy lmao')
    console.log(req.params.book)
    res.render('index', { title: 'Expresso' });
  }
}

module.exports = Page
