
    //L.geoJSON(data).addTo(mymap);

    $(function() {

      function updateStats(data)
      {
        var ctx = document.getElementById("myChart");
        ctx.setContex
        var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [data.Macron, data.fillon, data.Melenchon, data.lepen, data.Poutou, data.dupontAignan],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
      }

      function style(feature) {
              if (feature.properties.candidates && feature.properties.candidates.Macron <feature.properties.candidates.fillon) {
                  return {
                      weight: 2,
                      opacity: 1,
                      color: 'white',
                      dashArray: '3',
                      fillOpacity: 0.7,
                      fillColor: '#FFA000'
                  };
              } else {
                  return {
                      weight: 2,
                      opacity: 1,
                      color: 'white',
                      dashArray: '3',
                      fillOpacity: 0.7,
                      fillColor: '#000'
                  };
              }

          }
          var mymap = L.map('mymap').setView([46.4317, 3.3037], 6);
          L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
              id: 'mapbox.streets',
              accessToken: 'pk.eyJ1IjoibWF4aW1lZGFzaWx2YSIsImEiOiJjajBtZmh0NzEwMDByMzJyengxMm9rcjJzIn0.Y_8ayqiCFwUG-oqdyN7fcg'
          }).addTo(mymap);
          var myurl="http://localhost:5000/everybody"
          $.ajax({
            dataType: "json",
            url: myurl ,
            jsonpCallback: 'callback',
            type: 'GET',
            success: function (data) {
              var geojsonLayer =L.geoJSON(data,{
              onEachFeature: function(feature, layer) {
                if(feature.properties && feature.properties.name)
                {
                 layer.bindPopup(feature.properties.name, {closeButton: true, offset: L.point(10,10)});
                 layer.on('click', function() {
                   layer.openPopup();
                   updateStats(feature.properties.candidates);
                   alert();
                 });

              }
              }});
              geojsonLayer.addTo(mymap);
              geojsonLayer.setStyle(style);
              mymap.on('zoomend',function()
            {
              if(mymap.getZoom()<6)
              {
                  alert("coucou");
                  return;
              }
            });

          }
        });
    });
