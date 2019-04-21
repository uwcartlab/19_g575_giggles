//Main  Code//

//global var for time stamp
//set to arbitrary "low" number here
//test by changing to time stamps within the dataset
TimeStamp = -9000000000000;

// A Map (data structure) to sort the layers by year
var yearMap = new Map();
// A Map (data structure) to hold the layerGroups
var layerGroups = new Map();
// A counter to track how many Ajax requests have been completed
var numAjax = 0;

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
            maxBoundsViscosity: 1.0,
            doubleClickZoom: false
            
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
            // Sort the data in yearMap by year
            processData(response);
            // Update number of completed Ajax requests
            numAjax++;
            // Create layer groups once all Ajax requests are completed and add to map
            if(numAjax == 3) {
                createLayerGroups();
                addLayerGroupsToMap(map);
            };
        }
    });
    $.ajax("data/NativeLandPre1880.geojson", {
        dataType: "json",
        success: function(response){
            // Sort the data in yearMap by year
            processData(response);
            // Update number of completed Ajax requests
            numAjax++;
            // Create layer groups once all Ajax requests are completed and add to map
            if(numAjax == 3) {
                createLayerGroups();
                addLayerGroupsToMap(map);
            };
        }
    });
    $.ajax("data/LandLostWithoutTreaty.geojson", {
        dataType: "json",
        success: function(response){
            // Sort the data in yearMap by year
            processData(response);
            // Update number of completed Ajax requests
            numAjax++;
            // Create layer groups once all Ajax requests are completed and add to map
            if(numAjax == 3) {
                createLayerGroups();
                addLayerGroupsToMap(map);
            };
        }
    });
}


// Function to process data
function processData(data, map){
    var myStyle = {
        "color": "#ffffff",
        "weight": 2,
        "opacity": 1
    };
    var dataLayer = L.geoJson(data, {
        style: myStyle,
        onEachFeature: onEachFeature
    });
}

function createLayerGroups() {
    for (var [key, value] of yearMap.entries()){
        console.log(value);
        var layerGroup = L.layerGroup(value);
        layerGroups.set(key, layerGroup);
    }
}

function addLayerGroupsToMap(map) {
    // We want to add the groups to the map starting with most recent
    // and working our way back
    // Create an array of the key values in reverse
    var keys = Array.from(layerGroups.keys()).sort().reverse();
    // Iterate through layer groups and add them to the map
    console.log(yearMap);
    for(i = 0; i < keys.length; i++) {
        layerGroups.get(keys[i]).addTo(map);
    }
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
        onEachFeature: onEachFeature,
        filter: filter
    });
    dataLayer.addTo(map);
    /* //Change class names of each polygon
    var boundaries = $('.leaflet-interactive')
        .addClass(function (d) {
            console.log(d)
            return 'nation' + d;
        }) 
    //Set default style for once region is dehighlighted 
    var desc = boundaries.append("desc")
    .text('{"opacity": "1"}');
    */
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
        var popupContent = "<p><b>Nation(s):</b> " + feature.properties.Nation_Cor + "</p><p><b>Double Click for primary source</p></b>";
        // <a href='" + feature.properties.LinkRoyce +"'> Click Here </a></p>"
        var popup=L.responsivePopup({autoPanPadding: [40,40] }).setContent(popupContent);
        layer.bindPopup(popup);
    }
    // Add event listeners to open the popup on hover
    layer.on({
        mouseover: function(){
            this.openPopup();
            //this.highlight(feature.properties);
        },
        dblclick: function(){
            window.open(feature.properties.LinkRoyce)
        },
        mouseout: function(){
            this.closePopup();
            //this.dehighlight(feature.properties);
        }
    });
    
    /*** Sorting data by year value ***/
    // Does this feature have a property called Year_value?
    if (feature.properties && feature.properties.Year_value) {
        // Does this year already exist in the yearMap?
        if (yearMap.get(feature.properties.Year_value) != undefined){
            // If it does, add the layer to the entry
            yearMap.get(feature.properties.Year_value).push(layer);
        }else{
            // If it does not, create an entry
            yearMap.set(feature.properties.Year_value, [layer]);
        }
    }
};

function filter(feature) {
    if (feature.properties && feature.properties.Cession_Da) {
        if (feature.properties.Cession_Da > TimeStamp){
            return true;
        }
    }
}

 //Function: highlight enumeration units and bars//
 function highlight(props) {
    //Change the opacity of the highlighted item by selecting the class
    var selected = $("." + props.Nation_Cor)
        .style("opacity", ".2");
    //Call setlabel to create dynamic label
    setLabel(props);
};

//Function: dehighlight regions//
function dehighlight(props) {
    var selected = $("." + props.Nation_Cor)
        .style("opacity", function () {
            //Get the unique opacity element for current DOM element within the desc element
            return getStyle(this, "opacity")
        });

    //Create function that gets the description text of an element
    function getStyle(element, styleName) {
        //Select current DOM element
        var styleText = $(element)
            .select("desc")
            //Return text content in desc
            .text();
        //Create JSON string
        var styleObject = JSON.parse(styleText);
        return styleObject[styleName];
    };
};

$(document).ready(createMap);
