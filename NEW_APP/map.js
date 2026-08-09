

map = L.map('map' , {
    zoomControl: false , //ripetuto 
}).setView([ 41.8992 , 12.5450 ], 10 );

baseOSM = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
		}).addTo(map);

/*
baseCartoDarkMap = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
}).addTo(map);
*/

baseCyclOsmMap = L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
    maxZoom: 19,
})//.addTo(map);

baseOpenTopoMap = L.tileLayer('https://tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
})//.addTo(map);

baseGoogleHybrid = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
    maxZoom: 19,
})//.addTo(map);

baseGoogleSatellite = L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 19,
})//.addTo(map);

baseGoogleRoad = L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 19,
})//.addTo(map);

baseWorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
})//.addTo(map);

baseMaps = {  
    [`<span style='font-family: ${font}; font-size: 1.75vh;'>OpenStreetMap</span>`]: baseOSM,
    //"CartoDarkMap": baseCartoDarkMap, 
    [`<span style='font-family: ${font}; font-size: 1.75vh;'>CyclOsmMap</span>`]: baseCyclOsmMap,
    [`<span style='font-family: ${font}; font-size: 1.75vh;'>OpenTopoMap</span>`]: baseOpenTopoMap,
    [`<span style='font-family: ${font}; font-size: 1.75vh;'>Google Hybrid</span>`]: baseGoogleHybrid,
    [`<span style='font-family: ${font}; font-size: 1.75vh;'>Google Satellite</span>`]: baseGoogleSatellite,
    [`<span style='font-family: ${font}; font-size: 1.75vh;'>Google Road</span>`]: baseGoogleRoad,
    [`<span style='font-family: ${font}; font-size: 1.75vh;'>WorldTopoMap</span>`]: baseWorldTopoMap,
}

layerDrawItems = new L.FeatureGroup();
layerMarkers = new L.FeatureGroup();

overlayMaps = {
	//GeoJSON data initialization 
	[`<span style='font-family: ${font}; font-size: 1.75vh;'><u>${ lang=='eng' ? 'Draw Items' : 'Elementi disegnati' }</u></span>`] : layerDrawItems, 
	[`<span style='font-family: ${font}; font-size: 1.75vh;'><u>${ lang=='eng' ? 'Markers' : 'Markers' }</u></span>`] : layerMarkers,
};

layerControl = L.control.layers(baseMaps, overlayMaps).addTo( map );

//Aggiunta Titolo BASE MAP DOPO inserimento Controllo sulla Mappa

baseLayersContainer = document.querySelector('.leaflet-control-layers-base');

titleElement01 = document.createElement('div');
titleElement01.innerHTML = `<span style='font-family: ${font}; font-size: 1.75vh';><b>${ lang=='eng' ? 'Base Map:' : 'Mappa di Base:' }</b></span>`;

baseLayersContainer.insertBefore(titleElement01, baseLayersContainer.firstChild);

//

//Aggiunta Titolo OVERLAY MAP DOPO inserimento Controllo sulla Mappa 

overlayContainer = document.querySelector('.leaflet-control-layers-overlays');

titleElement02 = document.createElement('div');
titleElement02.innerHTML = `<span style='font-family: ${font}; font-size: 1.75vh';><b>${ lang=='eng' ? 'Overlay Map:' : 'Mappa Sovrapposta:' }</b></span>`;

overlayContainer.insertBefore(titleElement02, overlayContainer.firstChild);

//ZOOM Control 

L.control.zoom({ position: 'topleft' }).addTo(map);

//DRAW Control

drawControl = new L.Control.Draw({
    edit: {
        featureGroup: layerDrawItems,
    },
    draw: {
        polyline: {	metric: 'metric' },
        polygon : { metric: 'metric' },
        rectangle: { metric: 'metric' },  
        circle: { metric: 'metric' },
        marker: { metric: 'metric' }, 
        circlemarker: { metric: 'metric' }, 
    },
});
        
map.addControl(drawControl); 

//draw:created ... 

//Mappe, Layer visibili
click_elements = document.getElementsByClassName("leaflet-control-layers-selector");

click_elements[ 4 ].click(); //baseMaps

click_elements[ click_elements.length - 2 ].click(); //layerDrawItems
click_elements[ click_elements.length - 1 ].click(); //layerMarkers //Vedi funzione seguente

//markerClusterGroup
cluMarkers = L.markerClusterGroup();

//minimap 
		
layerMiniMap = L.tileLayer( 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}' ); 
miniMap = new L.Control.MiniMap( layerMiniMap , { 
	toggleDisplay : true , 
	zoomLevelOffset: -6, //-16
	width: Math.round( window.screen.width /10.0 ), 
	height: Math.round( window.screen.height /10.0 ) , 
} ).addTo(map);

miniMap.setPosition('bottomright'); //topright

measureControl = new L.Control.Measure( { 
    primaryLengthUnit: "kilometers" , 
    primaryAreaUnit: "sqmeters" ,
    activeColor: '#FF0000', // Active line/area color (e.g., Red)
    completedColor: '#FFA500' // Finished line/area color (e.g., Green)
} );

// Disable auto-pan by overriding the plugin’s internal method(s):
L.Control.Measure.include({
	// Prevent auto-panning when the capture marker is placed
	_setCaptureMarkerIcon: function () {
	// Turn off autoPan
	this._captureMarker.options.autoPanOnFocus = false;
	// Call the original icon setup
	this._captureMarker.setIcon(
        L.divIcon({
            iconSize: this._map.getSize().multiplyBy(2),
        })
    );
},

// Optionally, override _startMeasure or other private methods if needed
// _startMeasure: function () {
//   // Your custom override
// },
});

measureControl.addTo( map );


//map.js