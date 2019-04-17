//Main  Code//

function createMap(){
	var map = L.map('map',{
		//Sets the longitude and latitude of where the map center is
			center: [37,-97],
			zoom: 4,
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
}

// A function to create the sequence controls for the interactive timeline
function createTimeline(map){



    // Append controls to container
    $('#info-pane').append('<span id = timelineControls></span>');

    
    // Create range input element (slider)
    $('#timelineControls').html('<input class = "timeline-slider" orientation = "vertical" id = "timelineSlider" type = "range" min = "1776" max = "2019" step="1" value = "1776">');
    
    // Add event listeners for slider
    $('.timeline-slider').on('input', function(){
        // TODO: change visible map
        // TODO: change context pane if passing major event
        
    })
}

$(document).ready(createMap);