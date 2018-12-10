
$(document).ready(function(){
  $('.section-wrapper').slick({
    dots: true,
  infinite: false,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide:1,
  centerMode: true,
  variableWidth: true
  });
});

var selectedBorough =  $("#dropdown1 option:selected").val();
var selectedTime = $("#dropdown2 option:selected").val();
var highlightColor = "#D4000D";
var startPoint = 0.0;
var endPoint = 12.0;

function changeBorough() {
    selectedBorough =  $("#dropdown1 option:selected").val();
    console.log(selectedBorough);
    selectedTime = $("#dropdown2 option:selected").val();
    startPoint = parseFloat(selectedTime);
    console.log(startPoint)
    if (startPoint==0.0) {
      endPoint = startPoint+12.0;
    }
    else {
      endPoint = startPoint+1.0;
    }
    console.log(endPoint)
    renderMap(selectedBorough,startPoint,endPoint);
    changeBoroughForLineChart();
}

function changeTime() {
    selectedBorough =  $("#dropdown1 option:selected").val();
    console.log(selectedBorough);
    selectedTime = $("#dropdown2 option:selected").val();
    console.log(selectedTime);
    startPoint = parseFloat(selectedTime);
    if (startPoint==0.0) {
      console.log("hello")
      endPoint = startPoint+12.0;
    }
    else {
        endPoint = startPoint+1.0;
    }
    console.log(startPoint)
    console.log(endPoint)

    renderMap(selectedBorough,startPoint,endPoint);
    changeTimeForLineChart();
}

var map = new L.Map('map');
renderMap();

function renderMap(_borough="ALL",_startPoint=0.0,_endPoint=12.0){

    map.eachLayer(function (layer) {
        map.removeLayer(layer);
    });


    // initialize the map
    if (_borough === "ALL"){
        map.setView([40.708700379161006, -73.90652770996094], 11);
        // map.setView([40.71427, -74.00597], 11);
        // map.setView([40.708700379161006, -73.90652770996094], 11);
    } else if (_borough === "BRONX"){
        map.setView([40.84985, -73.86641], 11);
    } else if (_borough === "QUEENS"){
        map.setView([40.68149, -73.83652], 11);
    } else if (_borough === "MANHATTAN"){
        map.setView([40.78343, -73.96625], 11);
    } else if (_borough === "BROOKLYN"){
        map.setView([40.6501, -73.94958], 11);
    } else if (_borough === "STATEN ISLAND"){
        map.setView([40.5795, -74.1502], 11);
    }

    /*
    // load a tile layer
    L.tileLayer('https://{s}.tiles.mapbox.com/v3/mapbox.mapbox-light/{z}/{x}/{y}.png',
      {
        attribution: 'Tiles by <a href="http://mapc.org">MAPC</a>, Data by <a href="http://mass.gov/mgis">MassGIS</a>',
        maxZoom: 17,
        minZoom: 9
      }).addTo(map);

    */

    // add a basemap to the 'map' element that was just instantiated
    L.tileLayer('https://a.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token={token}',
        {
            attribution: 'Mapbox',
            token: 'pk.eyJ1IjoicHppZWdsZXIiLCJhIjoiY2ltMHo3OGRxMDh0MXR5a3JrdHNqaGQ0bSJ9.KAFBMeyysBLz4Ty-ltXVQQ'
        }).addTo(map);


    var s = 0.0;
    var intensity = 0.0;
    var rnd = Math.random();
    if (rnd > 0.5) {
        s = 0.1;
    } else {
        s = 0.9;
    }

    //console.log(s);

    $.getJSON("GeoObs.json", function (data) {

        var filtered_data = data.features.filter(function (d) {

            if (_borough === "ALL") {
                if (d.properties.time >= (_startPoint*2) && d.properties.time < (_endPoint*2)){
                  return true;
                }
                else {
                  return false;
                }
            }
            else {
                return (d.properties.borough === _borough && d.properties.time >= (_startPoint*2) && d.properties.time < (_endPoint*2));
            }
        });

        var locations = filtered_data.map(function (d) {
            // the heatmap plugin wants an array of each location
            var location = d.geometry.coordinates.reverse();
            //console.log(intensity)

            /*if (d.properties.borough == "BRONX"|| d.properties.borough == "BROOKLYN"){
          intensity = s;
            } else {
              intensity = 1 - s;
            }*/

            intensity = Math.random();

            //location.push(intensity * 1);
            return location; // e.g. [50.5, 30.5, 0.2], // lat, lng, intensity


        });

        var heat = L.heatLayer(locations, {radius: 8});
        map.addLayer(heat);
    });
}
