var fs=require('fs');
var i=0;
var cityTab=new Array();  var file=fs.readFile('./Data/communes.csv', (err, data) => {
    if (err) throw err;
    else {
      console.log(data.code_region)
        /*cityTab[i]=new Array();
        cityTab[i][0]=data.code_region;
        cityTab[i][1]=data.nom_region;
        cityTab[i][2]=data.numero_departement;
        cityTab[i][3]=data.nom_departement;
        cityTab[i][4]=data.nom_commune;
        cityTab[i][5]=data.latitude;
        cityTab[i][6]=data.longitude;*/
    }
      //console.log(data);
      i++;
  });
var file=fs.readFile('./Data/communes.csv', (err, data) => {
  if (err) throw err;

});
function locationByCityName(name)
{

  this.name=name;
  this.dept="";
  this.region="";
  this.deptN=0;
  this.regN=0;
  this.affectArguments();


};
locationByCityName.prototype.affectArguments = function () {

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
