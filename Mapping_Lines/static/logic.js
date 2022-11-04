// Create a map object
var myMap = L.map("map", {
  center: [30.2672, -97.7431],
  zoom: 5
});
  
// Coordinates for each point to be used in the line.
var line = [
  // [33.9416, -118.4085],
  [37.6213, -122.3790],
  [30.2672, -97.7431],
  [43.6777, -79.6248],
  [40.7128, -74.0060]
];


L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Define a markerSize function that will give each city a different radius based on its population
function markerSize(population) {
  return population / 20;
}

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

 for (var i = 0; i < cities.length; i++) {
  L.circle(cities[i].location, {
    fillOpacity: 0.38,
    color: "black",
    fillColor: "red",
    // Setting our circle's radius equal to the output of our markerSize function
    // This will make our marker's size proportionate to its population
    radius: markerSize(cities[i].population)
}).bindPopup("<h1>" + cities[i].city + ", " + cities[i].state + "</h1> <hr> <h3>Population: " + cities[i].population + "</h3>").addTo(myMap);
}

// Create a polyline using the line coordinates and make the line red.
L.polyline(line, {
  color: "blue"
}).addTo(myMap);