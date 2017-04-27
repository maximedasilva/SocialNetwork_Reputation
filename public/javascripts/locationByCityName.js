var fs = require('fs');
var jsondb = require('node-json-db');
var _ = require('underscore');
//require files


function locationByCityName(name, myTab, candidate, region,date) {//constructeur
  this.candidate = candidate;
  this.cityTab = myTab;
  this.name = name;
  this.insee = 1;
  this.jsonRegion = region;
this.date=date
};
locationByCityName.prototype.affectArguments = function() {//on affecte l'insee et les code region/departement
  var i = 0;
  var found = false;
  while (i < this.cityTab.length && !found) {//on cherche la ville correspondante
    if (this.name == this.cityTab[i][1]) { //recuperation nom commune
      this.insee = this.cityTab[i][0];
      this.NRegion = this.cityTab[i][2];
      this.NDept = this.cityTab[i][3];
      this.jsonCity = new jsondb("./Data/geodata/communes/" + this.NDept);//on ouvre le fichier json city
      this.jsonDept = new jsondb("./Data/geodata/departements/" + this.NRegion + "/departements");

      found = true;
    }
    i++;
  }

}
locationByCityName.prototype.getInsee = function() {
  return this.insee;
}
locationByCityName.prototype.getCandidate = function() {
  return this.candidate;
}
locationByCityName.prototype.getDate = function() {
  return this.date;
}
locationByCityName.prototype.writeData = function() {//on ecrit dans les fichiers JSON
  if (this.insee != 1) {//Si la ville est valide
    var dateJSON=new jsondb("./Data/tweetsPerDate", true, false);//On ouvre le nombre de tweet
    try{
      var data=dateJSON.getData("/dates/"+this.date+"/"+this.candidate);//On essaye de récupérer le nombre de tweet pour la date et le candidat
      dateJSON.push("/dates/"+this.date+"/"+this.candidate,data+1);//On ajoute un
    }
catch(error){dateJSON.push("/dates/"+this.date+"/"+this.candidate,1);}//on initialise a 1

    try {
      var notFound = true;
      var cpt = 0;
      var getRegion = 0;
      while (notFound) {//On cherche la bonne feature dans le fichier GeoJSON
        if (this.jsonRegion.getData("/features[" + cpt + "]/properties/NUMERO") == this.NRegion) {
          getRegion = cpt;
          notFound = false;
        } else {
          cpt++;
        }
      }

      try {

        var data = this.jsonRegion.getData("/features[" + cpt + "]/properties/candidates/" + this.candidate);//on essaye derécupérer le nombre de tweet pour la region et le candidat
       this.jsonRegion.push("/features[" + cpt + "]/properties/candidates/" + this.candidate, data + 1);//on ajoute 1
      } catch (error) {
       this.jsonRegion.push("/features[" + cpt + "]/properties/candidates/" + this.candidate, 1);//on a initialise a 1
      }


      var notFound = true;
      var cpt = 0;
      var getDept = 0;

    //meme chose pour les ville

      _.filter(this.jsonCity.getData("/features"), function(item) {
        if (item.properties.insee == this.insee) {
          try {
          item.properties.candidates[this.candidate] = item.properties.candidates[this.candidate] + 1;
          } catch (error) {
            item.properties.candidates[this.candidate] = 1
          }
        }
      })
      // meme chose pour le département
      _.filter(this.jsonDept.getData("/features"), function(item) {
        if (item.properties.NUMERO == this.NDept) {
          try {
            item.properties.candidates[this.candidate] = item.properties.candidates[this.candidate] + 1;
          } catch (error) {
            item.properties.candidates[this.candidate] = 1
          }
        }
      })
    } catch (error) {
      console.log(error);
    }
}
}
module.exports = locationByCityName;
