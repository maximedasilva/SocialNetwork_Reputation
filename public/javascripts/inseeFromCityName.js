var fs = require('fs');
var jsondb=require('node-json-db');
var file = fs.readFile('./Data/communes.csv', (err, data) => {
    if (err)
        throw err;
    }
);
var obj ={
  01: [08,10,51,52,54,55,57,67,68,88],
  02: [16,17,19,23,24,33,40,47,64,79,86,87],
  03: [01,03,07,15,26,38,42,43,63,69,73,74],
  04: [14,27,50,61,76],
  05: [21,25,39,58,70,71,89,90],
  06: [22,29,35,56],
  07: [18,28,36,37,41,45],
  09: [75,77,78,91,92,93,94,95],
  10: [09,11,12,30,31,32,34,46,48,65,66,81,82],
  11: [02,59,60,62,80],
  12: [44,49,53,72,85],
  13: [04,05,06,13,83,84]
}
function locationByCityName(name, myTab,candidate,nLine) {
    this.candidate = candidate;
    this.cityTab = myTab;
    this.name = name;
    this.insee = 1;
    this.nLine=nLine;

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
locationByCityName.prototype.deleteJson=function()
 {
   fs.readFile('./Data/geodata/regions.json',{encoding: 'utf8'},function(err,data) {
  var obj = JSON.parse(data);
  var test=obj.features;
  test.forEach(function(element){

  element.properties.candidates={};

})
var string = JSON.stringify(obj,null,'\t');

fs.writeFile('./Data/geodata/regions.json',string,function(err) {
  if(err) return console.error(err);
  console.log('done');
});
})
}
locationByCityName.prototype.writeData = function () {
  var db = new jsondb("./Data/geodata/regions", true, false);


  if(this.insee!=1)
  {

      var dept=this.insee.substring(0, 2);
        if(dept==01)
        {
  try{
    var i=0;
    while(db.getData("/features["+i+"]/properties/NUMERO")!=dept)
    {
      i++;s
    }
    try{
    var data = db.getData("/features["+i+"]/properties/candidates/"+this.candidate);
    db.push("/features["+i+"]/properties/candidates/"+this.candidate,data+1)
    }
    catch(error)
    {
      db.push("/features["+i+"]/properties/candidates/"+this.candidate,1);
    }
  }
  catch(error)
  {
  }
  }
}
}

module.exports = locationByCityName;
