//L.geoJSON(data).addTo(mymap);

$(function() {
  var selectionDept="";
  var selectionRegion="";
  var actualZoom="region";
  var totalCandidate=0;
  var current_Candidate="";
  var colors = {
    Poutou: "rgb(90, 10, 10)",
    arthaud: "rgb(255, 241, 57)",
    Melenchon: "rgb(200, 0, 0)",
    Hamon: "rgb(255, 129, 129)",
    Lassalle: "rgb(255, 153, 0)",
    Macron: "rgb(116, 174, 232)",
    fillon: "rgb(0, 102, 204)",
    dupontAignan: "rgb(128, 64, 192)",
    Asselineau: "rgb(17, 127, 132)",
    Cheminade: "rgb(153, 157, 157)",
    lepen: "rgb(70, 66, 66)"
  }

  function updateStats(data) {
    $('#resultCanvas').remove(); // this is my <canvas> element
    $('#test').append('<canvas id="resultCanvas" height="200"></canvas>');
    var ctx = document.getElementById("resultCanvas");

    var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [
          "Poutou",
          "Arthaud",
          "Melenchon",
          "Hamon",
          "Lassalle",
          "Macron",
          "fillon",
          "Dupont-Aignan",
          "Asselineau",
          "Cheminade",
          "Le Pen"
        ],
        datasets: [
          {
            label: 'Nombre de tweets',
            data: [
              data.Poutou,
              data.arthaud,
              data.Melenchon,
              data.Hamon,
              data.Lassalle,
              data.Macron,
              data.fillon,
              data.dupontAignan,
              data.Asselineau,
              data.Cheminade,
              data.lepen
            ],
            backgroundColor: [
              colors.Poutou.replace(')', ', 0.5)').replace('rgb', 'rgba'),
              colors.arthaud.replace(')', ', 0.5)').replace('rgb', 'rgba'),
              colors.Melenchon.replace(')', ', 0.5)').replace('rgb', 'rgba'),
              colors.Hamon.replace(')', ', 0.5)').replace('rgb', 'rgba'),
              colors.Lassalle.replace(')', ', 0.5)').replace('rgb', 'rgba'),
              colors.Macron.replace(')', ', 0.5)').replace('rgb', 'rgba'),
              colors.fillon.replace(')', ', 0.5)').replace('rgb', 'rgba'),
              colors.dupontAignan.replace(')', ', 0.5)').replace('rgb', 'rgba'),
              colors.Asselineau.replace(')', ', 0.5)').replace('rgb', 'rgba'),
              colors.Cheminade.replace(')', ', 0.5)').replace('rgb', 'rgba'),
              colors.lepen.replace(')', ', 0.5)').replace('rgb', 'rgba')
            ],
            borderColor: [
              colors.Poutou,
              colors.arthaud,
              colors.Melenchon,
              colors.Hamon,
              colors.Lassalle,
              colors.Macron,
              colors.fillon,
              colors.dupontAignan,
              colors.Asselineau,
              colors.Cheminade,
              colors.lepen
            ],
            borderWidth: 1
          }
        ]
      },
      options: {}
    });
  }

  function style(feature) {
    if (feature.properties.candidates) {
      if (current_Candidate == "everybody") {
        max = -1;
        for (var a in feature.properties.candidates) {
          if (feature.properties.candidates[a] > max) {
            max = feature.properties.candidates[a];
            key = a;
          }
        }

        return {
          weight: 0.4,
          opacity: 1,
          color: 'black',
          dashArray: '1',
          fillOpacity: 0.7,
          fillColor: colors[key]
        };
      }
      else {
        var number=255-(255*(feature.properties.candidates[current_Candidate]/totalCandidate));
        console.log(feature.properties.candidates[current_Candidate]);
        console.log(totalCandidate);
        console.log(255*(feature.properties.candidates[current_Candidate]/totalCandidate));
        var param='rgb('+(Math.round(number)).toString()+','+(Math.round(number)).toString()+','+(Math.round(number)).toString()+')';
        return{
        weight: 0.4,
        opacity: 1,
        color: 'black',
        dashArray: '1',
        fillOpacity: 0.7,
        fillColor: param
      }

    } }else {
      return {
        weight: 0.4,
        opacity: 1,
        color: 'black',
        dashArray: '1',
        fillOpacity: 0.5,
        fillColor: '#FFF'
      };
    }

  }
  var mymap = L.map('mymap').setView([
    46.4317, 3.3037
  ], 6);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWF4aW1lZGFzaWx2YSIsImEiOiJjajBtZmh0NzEwMDByMzJyengxMm9rcjJzIn0.Y_8ayqiCFwUG-oqdyN7fcg'
  }).addTo(mymap);



  window.map = function(candidate) {
    var id="";
    if(mymap.getZoom()>7 && actualZoom=="region" && selectionRegion!=""){
        actualZoom="departement"
        id=selectionRegion;
    }
    else if(mymap.getZoom() >8.5&&actualZoom=="departement"&& selectionDept!=""){
      actualZoom="city";
      id=selectionDept;
    }
    else if(actualZoom=="region"){
      actualZoom="region";
      id="nothing";
      selection="";
    }
    current_Candidate=candidate;
      mymap.eachLayer(function(layer) {
        mymap.removeLayer(layer);
      });
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoibWF4aW1lZGFzaWx2YSIsImEiOiJjajBtZmh0NzEwMDByMzJyengxMm9rcjJzIn0.Y_8ayqiCFwUG-oqdyN7fcg'
      }).addTo(mymap);

    var myurl = "http://localhost:5000/"+actualZoom+"/"+id;
    $.ajax({
      dataType: "json",
      url: myurl,
      jsonpCallback: 'callback',
      type: 'GET',

      success: function(data) {
        totalCandidate=0;

        var geojsonLayer = L.geoJSON(data, {
          onEachFeature: function(feature, layer) {
            if(candidate!="everybody"){
              if (feature.properties.candidates){
                try{
              totalCandidate+=feature.properties.candidates[candidate];
            }
            catch(error){}
          }
        }
            if (feature.properties && feature.properties.nom) {

              layer.bindPopup(feature.properties.nom, {

                closeButton: true,
                offset: L.point(10, 10)
              });
              layer.on('click', function() {
                layer.openPopup();
                if(actualZoom=='region')
                {selectionRegion=feature.properties.NUMERO;}
                else if(actualZoom=="departement"){selectionDept=feature.properties.NUMERO;}
                  updateStats(feature.properties.candidates);
                }
              );

            }
          }
        });
        geojsonLayer.addTo(mymap);
        geojsonLayer.setStyle(style);
        mymap.on('zoomend', function() {
            if(mymap.getZoom() > 8.5&&actualZoom=="region")
            {
              map(current_Candidate);
            }
            if (mymap.getZoom() > 7&&actualZoom=="departement") {

                console.log(selection);

              map(current_Candidate);
            }

        });

      }
    });
  }
});
