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
    
    // Create the sequence slider
    createTimeline(map);
    loadData(map);
}

//Function: Load  all the data using AJAX//
function loadData(map, year){
    $.ajax("data/NativeLand1880On.geojson", {
        dataType: "json",
        success: function(response){
            console.log(response);
            addDataToMap(response, map);
            createPopup(response,map);
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
    var dataLayer = L.geoJson(data, {style: myStyle});
    dataLayer.addTo(map);
}

//Function: to create the sequence controls for the interactive timeline//
function createTimeline(map){
    
        
    // Create new control position to place title in left center of map
    var corners = map._controlCorners;
        container = map._controlContainer;
    var className = 'leaflet-left leaflet-verticalCenter';
        corners['leftverticalCenter'] = L.DomUtil.create('div', className, container);

    // Create control extension for the left center of the map
    var TimelineControl = L.Control.extend({
        options: {
            position: 'leftverticalCenter'
        },
        
        onAdd: function (map) {
            // Container will go in the top center
            var container = L.DomUtil.create('div', 'timeline-container');
            
            return container;
        }
    });
    
    // Add control layout to map
    map.addControl(new TimelineControl());


    var timelineSlider = L.control.slider(function(value) {
            console.log(value);
        },{
        size: '700px',
        position: 'leftverticalCenter',
        id: 'timelineSlider',
        min: 1776,
        max: 2019,
        value: 1776,
        step: 1,
        collapsed: false,
        orientation: 'vertical',
        syncSlider: true
        }).addTo(map);
    
/*    // Append controls to container
    $('#info-pane').append('<span id = timelineControls></span>');

    
    // Create range input element (slider)
    $('#timelineControls').html('<input class = "timeline-slider" orient = "vertical" id = "timelineSlider" type = "range" min = "1776" max = "2019" step="1" value = "1776">');
    
    
    // Add event listeners for slider
    $('.timeline-slider').on('input', function(){
        // TODO: change visible map
        // TODO: change context pane if passing major event
        
    })*/
}

//Function: Create and format popup//
function createPopup(response,map) {
    features=response.features
    var i;
    for (i=0; i<features.length;i++){
        nation=features[i].properties.Nation_Cor
        console.log(nation)
        //Bind details to popup(module 5)
    }
};

$(document).ready(createMap);
