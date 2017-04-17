var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  var json=require('../Data/geodata/regions.json');
  res.json(json);
});
module.exports = router;
