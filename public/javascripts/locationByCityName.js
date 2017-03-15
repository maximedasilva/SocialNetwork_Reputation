var fs=require('fs');
var file=fs.readFile('./Data/communes.csv', (err, data) => {
  if (err) throw err;
});

function locationByCityName(name,myTab)
{
  this.cityTab=myTab
  this.name=name;
  this.dept="";
  this.region="";
  this.deptN=0;
  this.regN=0;
  this.affectArguments();
};
locationByCityName.prototype.affectArguments = function () {
  var i =0;
  var found=false;
  while(i<this.cityTab.length && !found)
  {
    if(this.name==this.cityTab[i][4])//recuperation nom commune
    {
      this.dept=this.cityTab[i][3];
      this.deptN= this.cityTab[i][2];
      this.region= this.cityTab[i][1];
      this.regN=this.cityTab[i][0];
      found=true;
    }
    i++;
  }
}
locationByCityName.prototype.getName = function(){
  return this.name;
}
locationByCityName.prototype.getDept=function(){
  return this.dept;
}
locationByCityName.prototype.getRegion=function(){
  return this.region;
}
locationByCityName.prototype.getDeptNumber = function () {
  return this.deptN;
}
locationByCityName.prototype.getRegionNumber = function () {
  return this.regN;
}
module.exports= locationByCityName;
