var extension = require("fast-csv");
var stream= extension.createReadStream("../../Twitter/scrap.csv");
var file=extension.fromStream(stream, {headers : true});

var cptTab = new Object();
file.on("data", function(data){
     cptTab[data.candidat]=1;
 })
