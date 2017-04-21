var express = require('express');
var router = express.Router();
router.get('/:id', function(req, res, next) {
console.log(req.params.id);
  res.header('Access-Control-Allow-Origin', "*")
  var json=require('../Data/geodata/communes/'+req.params.id+'.json');
  res.json(json);
});
module.exports = router;
