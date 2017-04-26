var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
console.log(req.params.id);
  res.header('Access-Control-Allow-Origin', "*")
  var json=require('../Data/TweetsPerDate.json');
  res.json(json);
});
module.exports = router;
