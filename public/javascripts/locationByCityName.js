var fs=require('fs');
var file=fs.readFile('./Data/communes.csv', (err, data) => {
  if (err) throw err;
  console.log(data);
});
var locationByCityName;
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
//ile;
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
