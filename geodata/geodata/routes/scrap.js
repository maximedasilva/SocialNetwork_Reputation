var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('scrap', { title: 'scrapping page',  })
});
module.exports = router;
