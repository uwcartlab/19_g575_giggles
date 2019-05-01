//Main  Code//

//http://tombatossals.github.io/angular-leaflet-directive/examples/0000-viewer.html#/basic/geojson-center-example
//^^For centering search result
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
// Holds value of previous year selected in timeline
var prevYear = 1775;
// The leaflet map
var map;
//The data layers 
var dataLayer;
//Area value
var area=1597786.476;
var landLost=0;
var endDate=1775;
var landGained=0;

//Function: Initialize map
function createMap(){
    //Set Max bounds for map to limit panning
    var bounds = [[51.3457868, -62.9513812],
    [22.7433195,-127.7844079]];

	map = L.map('map',{
		//Sets the longitude and latitude of where the map center is
			center: [37,-96.55],
            zoom: 5,
            maxZoom:8,
            minZoom:5,
            maxBounds: bounds,
            maxBoundsViscosity: 1.0,
            doubleClickZoom: false,
            scrollWheelZoom: false
            
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
    
    
    loadData(map);
    
}

//Function: Add barebones to map//
function ajaxCompleted(map){
    createLayerGroups();
    // Create the sequence slider
    var timelineSlider = createTimeline(map);
    addSearch(map);
    //Call create legend function
    createLegend(map);
    //Ensures that the legend loads with the correct first year
    updateLegend('1775');
    
    //$('#date-1776').html('WORK DAMMIT');
    
    //makeDatesClickable(timelineSlider);
    
    createSectionWatchers(timelineSlider);
    
    makeDatesClickable(timelineSlider);
    
    
    

}

function makeDatesClickable(timelineSlider){
    
    document.getElementById('date-1776').addEventListener("click", function(){
        slideToDate(1776, timelineSlider); 
        document.getElementById('1776').scrollIntoView();
    });
    document.getElementById('date-1787').addEventListener("click", function(){
        slideToDate(1787, timelineSlider); 
        document.getElementById('1787').scrollIntoView();
    });
    document.getElementById('date-1791').addEventListener("click", function(){
        slideToDate(1791, timelineSlider); 
        document.getElementById('1791').scrollIntoView();
    });
    document.getElementById('date-1803').addEventListener("click", function(){
        slideToDate(1803, timelineSlider); 
        document.getElementById('1803').scrollIntoView();
    });
    document.getElementById('date-1814').addEventListener("click", function(){
        slideToDate(1814, timelineSlider); 
        document.getElementById('1814').scrollIntoView();
    });
    document.getElementById('date-1819').addEventListener("click", function(){
        slideToDate(1819, timelineSlider); 
        document.getElementById('1819').scrollIntoView();
    });
    document.getElementById('date-1830').addEventListener("click", function(){
        slideToDate(1830, timelineSlider); 
        document.getElementById('1830').scrollIntoView();
    });
    document.getElementById('date-1848').addEventListener("click", function(){
        slideToDate(1848, timelineSlider); 
        document.getElementById('1848').scrollIntoView();
    });
    document.getElementById('date-1851').addEventListener("click", function(){
        slideToDate(1851, timelineSlider); 
        document.getElementById('1851').scrollIntoView();
    });
    document.getElementById('date-1876').addEventListener("click", function(){
        slideToDate(1876, timelineSlider); 
        document.getElementById('1876').scrollIntoView();
    });
    document.getElementById('date-1887').addEventListener("click", function(){
        slideToDate(1887, timelineSlider); 
        document.getElementById('1887').scrollIntoView();
    });
    document.getElementById('date-1897').addEventListener("click", function(){
        slideToDate(1897, timelineSlider); 
        document.getElementById('1897').scrollIntoView();
    });
    document.getElementById('date-1906').addEventListener("click", function(){
        slideToDate(1906, timelineSlider); 
        document.getElementById('1906').scrollIntoView();
    });
    
}

function createSectionWatchers(timelineSlider){
    var introWatcher = scrollMonitor.create($('#intro'));
    var d1776Watcher = scrollMonitor.create($('#1776'));
    var d1787Watcher = scrollMonitor.create($('#1787'));
    var d1791Watcher = scrollMonitor.create($('#1791'));
    var d1803Watcher = scrollMonitor.create($('#1803'));
    var d1814Watcher = scrollMonitor.create($('#1814'));
    var d1819Watcher = scrollMonitor.create($('#1819'));
    var d1830Watcher = scrollMonitor.create($('#1830'));
    var d1848Watcher = scrollMonitor.create($('#1848'));
    var d1851Watcher = scrollMonitor.create($('#1851'));
    var d1876Watcher = scrollMonitor.create($('#1876'));
    var d1887Watcher = scrollMonitor.create($('#1887'));
    var d1897Watcher = scrollMonitor.create($('#1897'));
    var d1906Watcher = scrollMonitor.create($('#1906'));
    

    introWatcher.fullyEnterViewport(function () {
        //console.log('intro');
        //console.log(timelineSlider);
    });
    
    d1776Watcher.fullyEnterViewport(function () {
        slideToDate(1776, timelineSlider);
    });
    
    d1787Watcher.fullyEnterViewport(function () {
        slideToDate(1787, timelineSlider);
    });
    
    d1791Watcher.fullyEnterViewport(function () {
        slideToDate(1791, timelineSlider);
    });
    
    d1803Watcher.fullyEnterViewport(function () {
        slideToDate(1803, timelineSlider);
    });
    
    d1814Watcher.fullyEnterViewport(function () {
        slideToDate(1814, timelineSlider);
    });
    
    d1819Watcher.fullyEnterViewport(function () {
        slideToDate(1819, timelineSlider);
    });
    
    d1830Watcher.fullyEnterViewport(function () {
        slideToDate(1830, timelineSlider);
    });
    
    d1848Watcher.fullyEnterViewport(function () {
        slideToDate(1848, timelineSlider);
    });
    
    d1851Watcher.fullyEnterViewport(function () {
        slideToDate(1851, timelineSlider);
    });
    
    d1876Watcher.fullyEnterViewport(function () {
        slideToDate(1876, timelineSlider);
    });
    
    d1887Watcher.fullyEnterViewport(function () {
        slideToDate(1887, timelineSlider);
    });
    
    d1897Watcher.fullyEnterViewport(function () {
        slideToDate(1897, timelineSlider);
    });
    
    d1906Watcher.fullyEnterViewport(function () {
        slideToDate(1906, timelineSlider);
    });
}

// This function makes use of the timeout function in order to
// gradually increment/decrement the timeline slider to a specific
// date.
function slideToDate(newEndDate, timelineSlider){
    // Update the global endDate value
    // TODO: Look at this as possible reason for dates going to wrong timeline date on click
    endDate = newEndDate;
    // Update the slider after a 10 millisecond delay
    setTimeout(function(){updateSlider(timelineSlider)}, 10);
    
}

// This function works with slideToDate to increment/decrement
// the timeline slider to a specific date.
function updateSlider(timelineSlider){
    // Increment or decrement the slider towards the endDate
    if(endDate > timelineSlider.slider.value){
        timelineSlider.slider.value++;
    } else if (endDate < timelineSlider.slider.value){
        timelineSlider.slider.value--;
    }
    // Update everything with the new slider value
    updateLegend(timelineSlider.slider.value)
    updateLayerGroups(timelineSlider.slider.value);
    prevYear = timelineSlider.slider.value;
    // If we have not reached our end date yet, call this function again
    // with a 10 millisecond delay
    if(timelineSlider.slider.value != endDate){
        setTimeout(function(){updateSlider(timelineSlider)}, 10);
    }
}




//Function: Load all the data using AJAX//
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
                ajaxCompleted(map);
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
                ajaxCompleted(map);
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
                ajaxCompleted(map);
            };
        }
    });
}


// Function to process data
function processData(data, map){
    var myStyle = {
        "color": "#dddddd",
        "weight": 2,
        "opacity": 1,
        "fill": true,
        "fillColor": "#ffffff",
        "fillOpacity": 1
    };
    dataLayer = L.geoJson(data, {
        style: myStyle,
        onEachFeature: onEachFeature
    });

    
    
};


    

// Creates group layers from yearMap
function createLayerGroups() {
    for (var [key, value] of yearMap.entries()){
        var layerGroup = L.featureGroup(value);
        layerGroup.setZIndex(1906 - key);
        layerGroups.set(key, layerGroup);
    }
}

// Updates group layers on map to match selected year on timeline
function updateLayerGroups(selectedYear){
    
    // Create an array of the key values in reverse
    var keys = Array.from(layerGroups.keys()).sort().reverse();
    // If we have moved forward in time, we will need to remove layers
    if (selectedYear > prevYear) {
        for(i = 0; i < keys.length; i++) {
            if (keys[i] > prevYear && keys[i] <= selectedYear) {
                landLost += layerGroups.get(keys[i]).getLayers()[0].feature.properties.Square_Mil;
                map.removeLayer(layerGroups.get(keys[i]));
            }
        }
    // If we have moved backwards in time, we will need to add layers
    } else if (selectedYear < prevYear) {
        for(i = 0; i < keys.length; i++) {
            if (keys[i] <= prevYear && keys[i] > selectedYear) {
                landGained += layerGroups.get(keys[i]).getLayers()[0].feature.properties.Square_Mil;
                map.addLayer(layerGroups.get(keys[i]));
                //layerGroups.get(keys[i]).bringToFront();
            }
        }
    } else if (selectedYear == 1775 && prevYear == 1775) {
        // We want to add the groups to the map starting with most recent
        // and working our way back (using our reverse order keys array)

        // Iterate through layer groups and add them to the map
        for(i = 0; i < keys.length; i++) {
            layerGroups.get(keys[i]).addTo(map);
            //layerGroups.get(keys[i]).bringToFront();
        }
    }
    
};

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
            updateLayerGroups(value);
            updateLegend(value)

            prevYear = value;
        // Update the endDate global variable if someone manually changes the timeline value
        endDate = value;
        },{
        // Styling the slider
        size: window.innerHeight + 'px',
        position: 'verticalcenterleft',
        id: 'timelineSlider',
        min: 1775,
        max: 1906,
        value: 1775,
        step: 1,
        collapsed: false,
        orientation: 'vertical',
        syncSlider: true,
        showValue: false
        }).addTo(map);
    
    return timelineSlider;
}

function onEachFeature(feature, layer) {
    // Does this feature have a property named Nation_Cor?
    if (feature.properties && feature.properties.Nation_Cor) {
        var popupContent = "<p><b>Nation(s):</b> " + feature.properties.Nation_Cor + "</p><p><b>Double Click for primary source</p></b>";
        //Create responsive popup that cannot extend beyond borders
        var popup=L.responsivePopup({offset: [25,25], autoPanPadding: [40,40], hasTip: false }).setContent(popupContent);
        layer.bindPopup(popup)
    };
    // Add event listeners to open the popup on hover
    layer.on({
        mouseover: highlightFeature,

        dblclick: function(){
            window.open(feature.properties.LinkRoyce)
        },
        mouseout: resetHighlight,
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
 function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        //weight: 5,
        fillColor: '#999',
        dashArray: '',
        fillOpacity: 1
    });

    this.openPopup()
}

//Function: dehighlight regions//
function resetHighlight(e) {
    this.closePopup()
    dataLayer.resetStyle(e.target);
}

//Function: create legend//
function createLegend(map){
    var LegendControl = L.Control.extend({
		options: {
			position: 'bottomright'
		},
            onAdd: function (map) {
                //Create the control container with a particular class name
                var container = L.DomUtil.create('div', 'legend-control-container');
                //Add temporal legend div to container
                $(container).append('<div id="temporal-legend">')
                //Start attribute legend div string to further be manipulated below 
                var div = L.DomUtil.create('div', 'attribute-legend');
                    categories = ['Native Land','Searched Native Land'];
                    symbols=['../images/NativeLand.svg','../images/SelectedTribe.svg',]
                // Add labels and images to legend with year benchmark
                //div.innerHTML += '<p id=title><strong>LEGEND: 1775 </strong></p>'

                for (var i = 0; i < symbols.length; i++) {
                    div.innerHTML += "<p>" + categories[i] + "</p>" + (" <img src="+ symbols[i] +" height='100' width='100'>");
                };
            //Add attribute legend to container
            $(container).append(div);
            return container
            }
        });
    map.addControl(new LegendControl());
};

//Function: Update the legend with new attribute//
function updateLegend(value){
    //Create Content for legend using the year and text
    if(value==1775){
        var content = '<p id=legend-title><strong>Year: '+ value + '<br>' + ' Approximate Land Lost: ' +  0 + '%'
        '</strong></p>'
    
    } else{
	var content = '<p id=legend-title><strong>Year: '+ value + '<br>' + ' Approximate Land Lost: ' +  parseInt((landLost-landGained)/(area)*(100)) + '%'
    '</strong></p>'}
	//Replace legend content with updated content
	$('#temporal-legend').html(content);
};
    


$(document).ready(createMap);
