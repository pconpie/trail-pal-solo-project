import stateData from './mapdata';

class Map {
  constructor() {
    this.myMap = L.map('mapid').setView([37.8, -96], 4);
    L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicGF0cmlja2Nvbm5lbGx5OTUiLCJhIjoiY2pkNmZvaHFnNWZtYjJ4bnNraXFoaHgzbyJ9.W_MKgqXNF6CQf1ROquv8ZQ`, {
      id: 'mapbox.light',
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  }).addTo(this.myMap);

  }
}