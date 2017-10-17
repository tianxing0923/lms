'use strict';

const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

router.get('/', function(req, res, next) {
  res.render('signin');
});

router.get('/add', function(req, res, next) {
  users.create(req, res, next);
  res.render('signin');
});

module.exports = router;