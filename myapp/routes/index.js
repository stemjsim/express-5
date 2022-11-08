var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express powered by Nodemon MF\'s', body: 'body in a p tag' });
});

module.exports = router;
