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
}

$(document).ready(createMap);