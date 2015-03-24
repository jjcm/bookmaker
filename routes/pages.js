var express = require('express');
var router = express.Router();
var PageController = require('../controllers/page')

router.post('/page', PageController.createImage)

router.get('/:id', PageController.getImages)
router.get('/', PageController.getImages)

module.exports = router;
