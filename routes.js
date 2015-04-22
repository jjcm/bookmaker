var express = require('express')
var router = express.Router()
var pages = require('./controllers/pageController')
var multiparty = require('connect-multiparty')
multipartyMiddleware = multiparty()

router.post('/page', multipartyMiddleware, pages.createImage)
router.post('/test', multipartyMiddleware, pages.test)
router.get('/page/:id', pages.getImages)
router.get('/book/:book/page/:page', pages.view)
router.get('/', function(req, res){ res.render('index', { title: "index"}) })

module.exports = router;
