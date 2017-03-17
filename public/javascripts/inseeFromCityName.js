var fs = require('fs');
var jsondb=require('node-json-db');
var file = fs.readFile('./Data/communes.csv', (err, data) => {
    if (err)
        throw err;
    }
);

function locationByCityName(name, myTab,candidate,nLine) {
    this.candidate = candidate
    this.cityTab = myTab;
    this.name = name;
    this.insee = 1;
    this.nLine=nLine;
    this.affectArguments();
};
locationByCityName.prototype.affectArguments = function() {
    var i = 0;
    var found = false;
    while (i < this.cityTab.length && !found) {
        if (this.name == this.cityTab[i][2]) { //recuperation nom commune
            this.insee = this.cityTab[i][1];
            found = true;
        }
        i++;
    }
}
locationByCityName.prototype.getInsee=function()
{
  return this.insee;
}
locationByCityName.prototype.getCandidate=function()
{
  return this.candidate;
}
locationByCityName.prototype.getDate = function () {
  return this.date;
}
locationByCityName.prototype.writeData = function () {
  var db = new jsondb("./Data/condensedData", true, false);
  if(this.insee==1 && this.name!="France")
  {
    console.log(this.nLine+" "+this.name+" "+this.insee);
  }
  if(this.name==="France")
  {

  }
  //else
db.push("/"+this.insee,this.name);
}
module.exports = locationByCityName;
