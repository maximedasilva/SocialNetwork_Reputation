var fs = require("fs");
var extension = require("fast-csv");
var stream = fs.createReadStream("./Twitter/scrap.csv");
var jsondb = require('node-json-db');
var cityStream = fs.createReadStream("./Data/communes.csv");
var cities = extension.fromStream(cityStream, {
    headers: true,
    delimiter: ';'
});
/*var PythonShell = require('python-shell');
var pyshell = new PythonShell('./Twitter/launch.py');
pyshell.on('message', function (message) {

    console.log(message);
});*/


var regionJSON=new jsondb("./Data/geodata/regions", true, false);
var i = 0;
var cityTab = new Array();
cities.on("data", function(data) {
    cityTab[i] = new Array();
    cityTab[i][0] = data.code_insee;
    cityTab[i][1] = data.nom_commune;
    cityTab[i][2]=data.numero_region;
    cityTab[i][3]=data.numero_departement;
    i++;
});
cities.on("end", function() {
    var file = extension.fromStream(stream, {headers: true});
    var cptTab = new Object();
    var lbn = require("../javascripts/inseeFromCityName.js");
  var cpt=0;
  file.on("data", function(data) {
      console.log(cpt++);
      var locationByCityName = new lbn(data.ville, cityTab,data.candidat,regionJSON);
      locationByCityName.affectArguments();
  //   locationByCityName.writeData();
    if(data.candidat=="")
    {

    }
        if (cptTab[data.candidat] == undefined)
        {

            cptTab[data.candidat] = 1;
          }
        else {
            cptTab[data.candidat]++;
        }
    });
    file.on("end", function() {
        var mystring = "";
        for (var i in cptTab) {
            mystring += i + "= " + cptTab[i] + "\n";
        }
        fs.writeFile("./Data/TweetsPerCandidates.txt", mystring, function(err) {});

        console.log("fin");
      });
})
