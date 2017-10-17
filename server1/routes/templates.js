var express = require('express');
var router = express.Router();

router.get('/:filename', function(req, res, next) {
  res.render('templates/' + req.params.filename);
});

router.get('/:folder/:filename', function(req, res, next) {
  res.render('templates/' + req.params.folder + '/' + req.params.filename);
});

module.exports = router;