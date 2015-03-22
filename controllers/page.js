var Page = {
  view: function(req, res, next){
    console.log(req.params.book)
    res.render('index', { title: 'Expresso' });
  },
  createImage: function(req, res, next){
    console.log(req.params.page)
  }
}

module.exports = Page
