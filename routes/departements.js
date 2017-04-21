var express = require('express');
var router = express.Router();
router.get('/:id', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*")
  var json=require('../Data/geodata/departements/'+req.params.id+'/departements.json');
  res.json(json);
  console.log(json);
});
module.exports = router;
