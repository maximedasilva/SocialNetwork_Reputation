var fs = require('fs');
var file = fs.readFile('./Data/communes.csv', (err, data) => {
    if (err)
        throw err;
    }
);

function locationByCityName(name, myTab, date,candidate) {
    this.candidate = candidate
    this.cityTab = myTab;
    this.name = name;
    this.date=date;
    this.insee = 0;
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
module.exports = locationByCityName;
