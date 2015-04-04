var express = require('express')
var router = express.Router()
var pages = require('./controllers/pageController')

router.post('/page', pages.createImage);
router.get('/page/:id', pages.getImages);
router.get('/book/:book/page/:page', pages.view);

module.exports = router;
