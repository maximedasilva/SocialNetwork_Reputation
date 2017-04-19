var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*")
  var json=require('../Data/geodata/departements/02/departements.json');
  res.json(json);
});
module.exports = router;
