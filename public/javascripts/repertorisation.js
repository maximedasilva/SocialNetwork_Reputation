var fs=require("fs");
  var extension = require("fast-csv");
 var stream= fs.createReadStream("./Twitter/scrap.csv");
 var cityStream=fs.createReadStream("./Data/communes.csv");
 var cities=extension.fromStream(cityStream, {headers : true, delimiter: ';'});
 var i=0;
 var cityTab=new Array();
  cities.on("data", function(data){
         cityTab[i]=new Array();
         cityTab[i][0]=data.code_region;
         cityTab[i][1]=data.nom_region;
         cityTab[i][2]=data.numero_departement;
         cityTab[i][3]=data.nom_departement;
         cityTab[i][4]=data.nom_commune;
         cityTab[i][5]=data.latitude;
         cityTab[i][6]=data.longitude;
         i++;
     });
 var file=extension.fromStream(stream, {headers : true});
  var cptTab = new Object();
  var lbn=require("../javascripts/locationByCityName.js");
  file.on("data", function(data){
    var locationByCityName=new lbn(data.ville,cityTab);
    //console.log(locationByCityName.getDeptNumber());
    if(cptTab[data.candidat]==undefined)
    cptTab[data.candidat]=1;
  else {
    cptTab[data.candidat]++;
  }
  });
  file.on("end",function()
 {
   var mystring="";
   for(var i in cptTab)
 {
     mystring+=i+"= "+cptTab[i]+"\n";
 }
 fs.writeFile("./Data/TweetsPerCandidates.txt",mystring,function(err){});
   console.log("fin");
 });
