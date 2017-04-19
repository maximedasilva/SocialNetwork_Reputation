var fs = require('fs');
var jsondb = require('node-json-db');
var file = fs.readFile('./Data/communes.csv', (err, data) => {
  if (err)
    throw err;
  }
);

function locationByCityName(name, myTab, candidate,region) {
  this.candidate = candidate;
  this.cityTab = myTab;
  this.name = name;
  this.insee = 1;

  this.jsonRegion=region;

};
locationByCityName.prototype.affectArguments = function() {
  var i = 0;
  var found = false;
  while (i < this.cityTab.length && !found) {
    if (this.name == this.cityTab[i][1]) { //recuperation nom commune
      this.insee = this.cityTab[i][0];
      this.NRegion=this.cityTab[i][2];
      this.NDept=this.cityTab[i][3];
      console.log(this.NRegion);
      this.jsonCity=new jsondb("./Data/geodata/communes/"+this.NDept);
      this.jsonDept=new jsondb("./Data/geodata/departements/"+this.NRegion+"/departements");

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
locationByCityName.prototype.deleteJson = function() {
  console.log("hey");
  try{

  fs.readFile('./Data/geodata/regions.json', {
    encoding: 'utf8'
  }, function(err, data) {
    console.log("coucous");
    var obj = JSON.parse(data);
    var test = obj.features;
    test.forEach(function(element) {
      element.properties.candidates = {};

    })
    var string = JSON.stringify(obj, null, '\t');

    fs.writeFile('./Data/geodata/regions.json', string, function(err) {
      if (err)
        return console.error(err);
      console.log('done');


    });
  })}
  catch(error){}
}


locationByCityName.prototype.writeData = function() {

  if (this.insee != 1) {

    try {
      var notFound=true;
      var cpt=0;
      var getRegion=0;
      while(notFound)
      {
      if(  this.jsonRegion.getData("/features["+cpt+"]/properties/NUMERO")==this.NRegion)
      {
        getRegion=cpt;
        notFound=false;
      }
      else{
        cpt++;
      }
      }
      try {

        var data = this.jsonRegion.getData("/features[" + cpt+ "]/properties/candidates/" + this.candidate);
        this.jsonRegion.push("/features[" + cpt + "]/properties/candidates/" + this.candidate, data + 1);
      } catch (error) {
        this.jsonRegion.push("/features[" + cpt + "]/properties/candidates/" + this.candidate, 1);
      }


      var notFound=true;
      var cpt=0;
      var getDept=0;
      console.log("coucou");

      while(notFound)
      {

        if(this.jsonDept.getData("/features["+cpt+"]/properties/NUMERO")==this.NDept)
        {

            getDept=cpt;
            notFound=false;

        }
        else {
          cpt++;
        }
      }
      try{
        var data = this.jsonDept.getData("/features[" + getDept + "]/properties/candidates/" + this.candidate);
        this.jsonDept.push("/features[" + getDept + "]/properties/candidates/" + this.candidate, data + 1)
      }
      catch(error){
        this.jsonDept.push("/features[" + getDept + "]/properties/candidates/" + this.candidate, 1)
      }

      notFound=true;
      cpt=0;
      var getCity=0;

      while(notFound)
      {
        if(parseInt(this.jsonCity.getData("/features["+cpt+"]/properties/insee"),10)==this.insee)
        {
            getCity=cpt;
            notFound=false;
        }
        else{
          cpt++;
        }
      }
      try{
        var data = this.jsonCity.getData("/features[" + getCity + "]/properties/candidates/" + this.candidate);
        this.jsonCity.push("/features[" + getCity + "]/properties/candidates/" + this.candidate, data + 1)
      }
      catch(error){
        this.jsonCity.push("/features[" + getCity + "]/properties/candidates/" + this.candidate, 1)
      }


    }catch(error){
      console.log(error);
    }

  }
  this.jsonCity=null;
  this.jsonDept=null;
  this.jsonRegion=null;
}

module.exports = locationByCityName;
