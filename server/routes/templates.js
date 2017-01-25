var express = require('express');
var router = express.Router();

router.get('/article/list', function(req, res, next) {
  res.render('templates/article/list');
});

module.exports = router;