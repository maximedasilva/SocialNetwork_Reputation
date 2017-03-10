var fs=require("fs");
  var extension = require("fast-csv");
 var stream= fs.createReadStream("../../Twitter/scrap.csv");
 var file=extension.fromStream(stream, {headers : true});
  var cptTab = new Object();
  console.log("aaa");
  var lbn=require("../javascripts/locationByCityName.js");
  file.on("data", function(data){
    console.log(data);
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
 fs.writeFile("../../Data/TweetsPerCandidates.txt",mystring,function(err){});
   console.log("fin");
 });
