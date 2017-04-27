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


var regionJSON=new jsondb("./Data/geodata/regions", true, false);//on ouvre le fichier Region
var i = 0;
var cityTab = new Array();//On demarre l'initialisation
cities.on("data", function(data) {//pour chaque ville dans communes.csv
    cityTab[i] = new Array();//Pour chaque ville
    cityTab[i][0] = data.code_insee;//on affecte le code insee le nom le numero ergion/departement
    cityTab[i][1] = data.nom_commune;
    cityTab[i][2]=data.numero_region;
    cityTab[i][3]=data.numero_departement;
    i++;
});
cities.on("end", function() {//lorsque on a fait toutes les villes
    var file = extension.fromStream(stream, {headers: true});//on commence a regarder tous nos enregistrements dans Twittr/scrap.csv
    var cptTab = new Object();
    var lbn = require("../javascripts/locationByCityName.js");//On require la vlasse locationByCityName

  var cpt=0;
  var numberTweetJSON=new jsondb("./Data/nbTweetdone", true, false)//on ouvre le nombre de tweetEffectue
  var numberTweet=numberTweetJSON.getData("/number");
  file.on("data", function(data) {//pour chaque enregistrement dans scrap.csv
      var date = data.dateheure.substring(0, 10);//on récupère la date
      console.log(cpt++);

      if(cpt>numberTweet){//si le tweet n'a pas été traité
      var locationByCityName = new lbn(data.ville, cityTab,data.candidat,regionJSON,date);//on crée un nouveau locationByCityName
      locationByCityName.affectArguments();//on affecte les arguments

      locationByCityName.writeData();//on écrit les données

      if (cpt%100==0)//tous les 100
      {
        numberTweetJSON.push('/number',cpt);//On enregistre le compteur de tweets traités
      }

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
      numberTweetJSON.push('/number',cpt);
        var mystring = "";
        for (var i in cptTab) {
            mystring += i + "= " + cptTab[i] + "\n";
        }
        fs.writeFile("./Data/TweetsPerCandidates.txt", mystring, function(err) {});

        console.log("fin");
      });
})
