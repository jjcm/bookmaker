var express = require('express')
var router = express.Router()
var pages = require('./controllers/pageController')
var books = require('./controllers/bookController')
var images = require('./controllers/imageController')
var pages = require('./controllers/pageController')
var multiparty = require('connect-multiparty')
multipartyMiddleware = multiparty()

router.post('/api/image/create', multipartyMiddleware, images.create)
router.post('/api/image/update', images.update)
router.get('/api/image/:id', images.getImage)
router.get('/api/image/:book/:page', images.getImages)
router.get('/api/book/:id', books.getBook)
router.get('/api/page/:book/:page', pages.getPage)
router.get('/book/:book/page/:page', pages.view)
router.get('/', function(req, res){ res.render('index', { title: "index"}) })

module.exports = router;
