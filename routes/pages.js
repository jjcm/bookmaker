var express = require('express');
var router = express.Router();
var PageController = require('../controllers/page')

router.post('/', PageController.createImage)

router.get('/:id', PageController.getImages)

module.exports = router;
