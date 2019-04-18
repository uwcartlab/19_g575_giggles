//Main  Code//

//Function: Initialize map
function createMap(){
    //Set Max bounds for map to limit panning
    var bounds = [[51.3457868, -62.9513812],
    [22.7433195,-127.7844079]];

	var map = L.map('map',{
		//Sets the longitude and latitude of where the map center is
			center: [37,-97],
            zoom: 4,
            maxZoom:8,
            minZoom:4,
            maxBounds: bounds,
            maxBoundsViscosity: 1.0
            
		});
		//Add OSM baselayer
		L.tileLayer.provider('CartoDB.DarkMatterNoLabels').addTo(map);
		//Remove tile outlines
		(function(){
			var originalInitTile = L.GridLayer.prototype._initTile
			L.GridLayer.include({
				_initTile: function (tile) {
					originalInitTile.call(this, tile);
		
					var tileSize = this.getTileSize();
		
					tile.style.width = tileSize.x + .5 + 'px';
					tile.style.height = tileSize.y + 1 + 'px';
				}
			});
		})()
    
    // Change attributions; include disclaimer
    // TODO: Add an actual disclaimer; maybe find a link to a good one
    map.attributionControl.setPrefix('DISCLAIMER: For visualization purposes only.  Not to be used in a court of law to represent tribal boundaries. | <a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');
    
    // Create the sequence slider
    createTimeline(map);
    addSearch(map);
    loadData(map);
}

//Function: Load  all the data using AJAX//
function loadData(map, year){
    $.ajax("data/NativeLand1880On.geojson", {
        dataType: "json",
        success: function(response){
            addDataToMap(response, map);
        }
    });
    $.ajax("data/NativeLandPre1880.geojson", {
        dataType: "json",
        success: function(response){
            addDataToMap(response, map);
        }
    });
    $.ajax("data/LandLostWithoutTreaty.geojson", {
        dataType: "json",
        success: function(response){
            addDataToMap(response, map);
        }
    });
}

//Function: Add and stylize data layers//
function addDataToMap(data, map) {
    var myStyle = {
        "color": "#ffffff",
        "weight": 2,
        "opacity": 1
    };
    var dataLayer = L.geoJson(data, {
        style: myStyle,
        onEachFeature: onEachFeature
    });
    dataLayer.addTo(map);
}

function addSearch(map){
    
    // Layer to contain searched elements
    var searchedLayer = new L.LayerGroup();
    // Add search control to map
    var controlSearch = new L.Control.Search({
        position: 'topright',
        layer: searchedLayer,
        collapsed: false
    })
    map.addControl(controlSearch);
}

//Function: to create the sequence controls for the interactive timeline//
function createTimeline(map){
    
    // Create additional Control placeholders for vertical centers of map
    function addControlPlaceholders(map) {
        var corners = map._controlCorners,
            l = 'leaflet-',
            container = map._controlContainer;

        function createCorner(vSide, hSide) {
            var className = l + vSide + ' ' + l + hSide;

            corners[vSide + hSide] = L.DomUtil.create('div', className, container);
        }

        createCorner('verticalcenter', 'left');
        createCorner('verticalcenter', 'right');
    }
    addControlPlaceholders(map);

    // Create slider for timeline
    var timelineSlider = L.control.slider(function(value) {
        // Put function calls that use the slider value here
            //console.log(value);
        },{
        // Styling the slider
        size: window.innerHeight + 'px',
        position: 'verticalcenterleft',
        id: 'timelineSlider',
        min: 1776,
        max: 2019,
        value: 1776,
        step: 1,
        collapsed: false,
        orientation: 'vertical',
        syncSlider: true
        }).addTo(map);
    
}

//Function: Create and format popup//
function createPopup(response,map) {
    features=response.features
    var i;
    for (i=0; i<features.length;i++){
        nation=features[i].properties.Nation_Cor
        //console.log(nation)
        //Bind details to popup(module 5)
    }
};

function onEachFeature(feature, layer) {
    // Does this feature have a property named Nation_Cor?
    if (feature.properties && feature.properties.Nation_Cor) {
        var popupContent = "<p><b>Nation:</b> " + feature.properties.Nation_Cor + "</p><p><b>Primary Source:</b> <a href='" + feature.properties.LinkRoyce +"'> Click Here </a></p>";
        layer.bindPopup(popupContent);
    }
    // Add event listeners to open the popup on hover
    layer.on({
        mouseover: function(){
            this.openPopup();
        },
        mouseout: function(){
            this.closePopup();
        }
    });
};

$(document).ready(createMap);
