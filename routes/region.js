var express = require('express');
var router = express.Router();
router.get('/:id', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*")
  var json=require('../Data/geodata/regions.json');
  res.json(json);
});
module.exports = router;
