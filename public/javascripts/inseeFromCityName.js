var fs = require('fs');
var jsondb = require('node-json-db');
var _ = require('underscore');
var file = fs.readFile('./Data/communes.csv', (err, data) => {
  if (err)
    throw err;
  }
);

function locationByCityName(name, myTab, candidate, region,date) {
  this.candidate = candidate;
  this.cityTab = myTab;
  this.name = name;
  this.insee = 1;
  this.jsonRegion = region;
this.date=date
};
locationByCityName.prototype.affectArguments = function() {
  var i = 0;
  var found = false;
  while (i < this.cityTab.length && !found) {
    if (this.name == this.cityTab[i][1]) { //recuperation nom commune
      this.insee = this.cityTab[i][0];
      this.NRegion = this.cityTab[i][2];
      this.NDept = this.cityTab[i][3];
      this.jsonCity = new jsondb("./Data/geodata/communes/" + this.NDept);
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
locationByCityName.prototype.writeData = function() {
  if (this.insee != 1) {
    var dateJSON=new jsondb("./Data/tweetsPerDate", true, false);
    try{
      var data=dateJSON.getData("/dates/"+this.date+"/"+this.candidate);
      dateJSON.push("/dates/"+this.date+"/"+this.candidate,data+1);
    }
catch(error){dateJSON.push("/dates/"+this.date+"/"+this.candidate,1);}

    try {
      var notFound = true;
      var cpt = 0;
      var getRegion = 0;
      while (notFound) {
        if (this.jsonRegion.getData("/features[" + cpt + "]/properties/NUMERO") == this.NRegion) {
          getRegion = cpt;
          notFound = false;
        } else {
          cpt++;
        }
      }
      try {

        var data = this.jsonRegion.getData("/features[" + cpt + "]/properties/candidates/" + this.candidate);
       this.jsonRegion.push("/features[" + cpt + "]/properties/candidates/" + this.candidate, data + 1);
      } catch (error) {
       this.jsonRegion.push("/features[" + cpt + "]/properties/candidates/" + this.candidate, 1);
      }


      var notFound = true;
      var cpt = 0;
      var getDept = 0;
      console.log("coucou");

      _.filter(this.jsonCity.getData("/features"), function(item) {
        if (item.properties.insee == this.insee) {
          try {
          item.properties.candidates[this.candidate] = item.properties.candidates[this.candidate] + 1;
          } catch (error) {
            item.properties.candidates[this.candidate] = 1
          }
        }
      })
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
