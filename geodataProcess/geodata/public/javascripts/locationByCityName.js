var fs=require('fs');
var file=fs.readFile('../../Data/communes.csv', (err, data) => {
  if (err) throw err;
  console.log(data);
});
var locationByCityName;
function locationByCityName(name)
{
  this.name=name;
}
locationByCityName.prototype.getName = function()
{
  return this.name;
};
module.exports= locationByCityName;
