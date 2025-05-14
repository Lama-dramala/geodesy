var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([51.510, -0.09]).addTo(map);
var circle = L.circle([51.490, -0.11], {
    color: 'aqua',
    fillColor: '#0f9ee0',
    fillOpacity: 0.5,
    radius: 200
}).addTo(map);
var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);
marker.bindPopup("<b>I am a marker popup.</b>").openPopup();
circle.bindPopup("I am a circle popup.");
polygon.bindPopup("I am a polygon popup.");
