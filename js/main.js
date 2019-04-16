//Main  Code//

function createMap(){
	var map = L.map('map',{
		//Sets the longitude and latitude of where the map center is
			center: [51, 12],
			zoom: 5,
		});
		//Add OSM baselayer
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', { 
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
				maxZoom: 6,
				minZoom:5,
				//sets the max zoom level of the map
				id: 'mapbox.dark',
				//the id of the map to copy
				accessToken: 'pk.eyJ1IjoicHJlc3RpbW9qIiwiYSI6ImNqczNmYWE2bzJmNTYzeW8zOXNlMnVpOGwifQ.OrEG7gIMeP3N3sMaNY3EGw'
			 //DEFINE THE TILE LAYER THAT WILL BE USED//
			}).addTo(map)   
		

}

$(document).ready(createMap);