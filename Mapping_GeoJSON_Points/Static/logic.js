// Create a map object
//var myMap = L.map("map", {
//    center: [37.5, -122.5],
//    zoom: 10
//  });

  // Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//    "type":"Feature",
//    "properties":{
//        "id":"3469",
//        "name":"San Francisco International Airport",
//        "city":"San Francisco",
//        "country":"United States",
//        "faa":"SFO",
//        "icao":"KSFO",
//        "alt":"13",
//        "tz-offset":"-8",
//        "dst":"A",
//        "tz":"America/Los_Angeles"},
//        "geometry":{
//            "type":"Point",
//            "coordinates":[-122.375,37.61899948120117]}}
//]};

// Grabbing our GeoJSON data.
// L.geoJSON(sanFranAirport).addTo(myMap);

// Grabbing our GeoJSON data.
//L.geoJSON(sanFranAirport, {
  // We turn each feature into a marker on the map.
//  pointToLayer: function(feature, latlng) {
//    console.log(feature);
//    return L.marker(latlng)
//    .bindPopup("<h1>" + feature.properties.name + "</h1>" + 
//    "<h2>" + feature.properties.city + ", " + feature.properties.country + "</h2>");

//  }

//}).addTo(myMap);
    
  // Coordinates for each point to be used in the line.
//  var line = [
//    [33.9416, -118.4085],
//    [37.6213, -122.3790],
//    [30.2672, -97.7431],
//    [43.6777, -79.6248],
//   [40.7128, -74.0060]
 // ];
  
  
//  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//    tileSize: 512,
//    maxZoom: 18,
//    zoomOffset: -1,
//    id: "mapbox/streets-v11",
//    accessToken: API_KEY
//  }).addTo(myMap);

  var line = [
    [33.9416,-118.4085],
    [37.6213, -122.3790],
    [40.7899, -111.9791],
    [47.4502, -122.3088]
  ];
  
  // We create the tile layer that will be the background of our map.
  var streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      accessToken: API_KEY
  });
  
  var light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}',{
      attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18, 
      accessToken: API_KEY
  });

  // Loop through the cities array and create one marker for each city.
// cityData.forEach(function(city) {
//     console.log(city)
//     L.circleMarker(city.location, {
//         radius: city.population/200000,
//         color: 'orange',
//         lineweight: 4
//     })
//     .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
//   .addTo(map);
// });

// We create the dark view tile layer that will be an option for our map.
var satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
var dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

// Create a base layer that holds both maps.
var baseMaps = {
"Day Navigation": light,
"Night Navigation": dark,
"Streets": streets,
"Satellite Streets": satelliteStreets

};

// Create the map object with center, zoom level and default layer.
var map = L.map('map', {
  center: [43.7, -79.3],
  zoom: 11,
  layers: [satelliteStreets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(myMap);

// // Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);

// Accessing the airport GeoJSON URL
var torontoHoods = "https://raw.githubusercontent.com/Baylex/Mapping_Earthquakes/main/torontoNeighborhoods.json ";

// Create a style for the lines.
var myStyle = {
  color: "blue",
  weight: 1
}

// Grabbing our GeoJSON data.
d3.json(torontoHoods).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data,{
  style : myStyle,
  onEachFeature : function(feature,layer) {
layer.bindPopup("<h3> Area Name: "+ feature.properties.AREA_NAME + "</h3> <hr> <h3> Area ID: " +feature.properties.AREA_S_CD +"</h3>");
}
}).addTo(myMap);
});
  
  // Define a markerSize function that will give each city a different radius based on its population
//  function markerSize(population) {
//    return population / 20;
//  }
  
  // Each city object contains the city's name, location and population
  var cities = [
    {
      city: "New York",
      state: "NY",
      location: [40.7128, -74.0059],
      population: 8550405
    },
    {
      city: "Chicago",
      state: "IL",
      location: [41.8781, -87.6298],
      population: 2720546
    },
    {
      city: "Houston",
      state: "Texas",
      location: [29.7604, -95.3698],
      population: 2296224
    },
    {
      city: "Los Angeles",
      state: "CA",
      location: [34.0522, -118.2437],
      population: 3971883
    },
    {
      city: "Phoenix",
      state: "AZ",
      location: [33.4484, -112.0740],
      population: 1660272
    }
  ];  
  
  // Use forEach to loop through the cities array and create one marker for each city object
  // cities.forEach(store =>   L.marker(city.location)
  
  // for (var i = 0; i < cities.length; i++) {
  //  L.circle(cities[i].location, {
  //    fillOpacity: 0.38,
  //    color: "black",
  //    fillColor: "red",

      // Setting our circle's radius equal to the output of our markerSize function
      // This will make our marker's size proportionate to its population
  //    radius: markerSize(cities[i].population)
//  }).bindPopup("<h1>" + cities[i].city + ", " + cities[i].state + "</h1> <hr> <h3>Population: " + cities[i].population + "</h3>").addTo(myMap);
//  }
  
  // Create a polyline using the line coordinates and make the line red.
  // L.polyline(line, {
  //  color: "blue"
  // }).addTo(myMap);

  // // Grabbing our GeoJSON data.
// d3.json(torontoHoods).then(function(data) {
//   console.log(data);
// // Creating a GeoJSON layer with the retrieved data.  Skill Drill 13.5.3 add popups to all markers
// L.geoJson(data,{
//   onEachFeature: function(feature, layer) {
//     console.log(layer);
//     layer.bindPopup("<h3>" + "Airport Code: " + feature.properties.faa +
//     "</h3><hr><p>" + feature.properties.name + "</p>");
//   }    
// }).addTo(map);
// });

