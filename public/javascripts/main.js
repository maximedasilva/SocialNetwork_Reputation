var fs = require("fs");
var extension = require("fast-csv");
var stream = fs.createReadStream("./Twitter/scrap.csv");
var cityStream = fs.createReadStream("./Data/communes.csv");
var cities = extension.fromStream(cityStream, {
    headers: true,
    delimiter: ';'
});
var i = 0;
var cityTab = new Array();
var inseeTab=new Array();
cities.on("data", function(data) {
    cityTab[i] = new Array();
    cityTab[i][1] = data.code_insee;
    cityTab[i][2] = data.nom_commune;
    i++;
});
cities.on("end", function() {
    var file = extension.fromStream(stream, {headers: true});
    var cptTab = new Object();
    var lbn = require("../javascripts/inseeFromCityName.js");
    file.on("data", function(data) {
      var locationByCityName = new lbn(data.ville, cityTab, data.candidat);
        inseeTab.push(locationByCityName);
        if (cptTab[data.candidat] == undefined)
            cptTab[data.candidat] = 1;
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
