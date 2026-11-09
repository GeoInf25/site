
var glob_font = "Times"; 

/* *** */ 

var glob_lang = "eng"; // eng, ita //CONTEGGIO RADIO BUTTON 

var glob_typeLang = [ /* NUMERO RIGHE CON CELLE VUOTE */
      {typeLang:""}, 
      {typeLang:""}, 
]

/* *** */ 

var glob_map = null;  

/* *** */ 

var glob_lat = null; 
var glob_long = null;  
var glob_zoom = 3.0; //Valore INIZIALE da aggiornare 

/* *** */ 

var glob_baseOSM = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
}); //.addTo(glob_map); 

var glob_baseCyclOsmMap = L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
	maxZoom: 19,
}); //.addTo(glob_map);

var glob_baseOpenTopoMap = L.tileLayer('https://tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
}); //.addTo(glob_map);

var glob_baseGoogleSatellite = L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
	maxZoom: 19,
}); //.addTo(glob_map);

var glob_baseMaps = { 
    "OpenStreetMap": glob_baseOSM,
    "CyclOSM": glob_baseCyclOsmMap,
    "WorldTopoMap": glob_baseOpenTopoMap,
    "WorldImagery": glob_baseGoogleSatellite,
};

/* *** */ 

var glob_dataLatLngZoom = [ 
      {
            Coordinates: "Latitude: --" 
      },
      {
            Coordinates: "Longitude: --"
      },
      {
            Coordinates: "Zoom: 3.00"
      },
]; 

/* *** */ 

var glob_mapButtons = [ /* NUMERO RIGHE CON CELLE VUOTE */
      {mapButtons: ""},
      {mapButtons: ""},
      {mapButtons: ""},
      
]; 

/* *** */ 

var glob_baseMap = [ /* NUMERO RIGHE CON CELLE VUOTE */
      {baseMap: ""},
      {baseMap: ""},
      {baseMap: ""},
      {baseMap: ""},
      
]; 

var glob_numbBaseMap = 1; //OpenStreetMap //CONTEGGIO RADIO BUTTON 

/* *** */ 

var glob_typeDistance = [ /* NUMERO RIGHE CON CELLE VUOTE */
      {typeDistance:""}, 
      {typeDistance:""}, 
]

var glob_numbTypeDistance = 1; //Euclidean //CONTEGGIO RADIO BUTTON 

/* *** */ 

var glob_initialDataRow00 = [ 
      {initialDataRow00:""}, 
      {initialDataRow00:""}, 
]

/* *** */ 

//Elenco Tabella Tabulator JS con funzioni di inizializzazione relative
var latLngZoom = null; 
var funcLatLngZoom = null; 

var baseMap = null; 
var funcBaseMap = null; 

var mapButtons = null; 
var funcMapButtons = null; 

var typeDistance = null; 
var funcTypeDistance = null; 

var typeLang = null; 
var funcTypeLang = null; 

var initialDataRow00 = null; 
var funcInitialDataRow00 = null; 
