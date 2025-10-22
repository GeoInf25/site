
var testIframe = "testIframe"

var map = null; 

//var LC = null; 

//var markers = null; 
/*
function addLC() {
    try {
        LC = L.control.layers( ).addTo(map);
    } catch( e ) {
        console.log( "" + e ); 
    }
}
*/
/*
function removeLC( LC ) {
    try {
        if( LC != undefined && LC != null ) {
            console.log( LC )
            LC.remove(  ); 
        }
    } catch( e ) {
        console.log( "" + e ); 
    }
}
*/

function addMarker(  ) {
    //console.log( "AAA" + map )
    
    var marker = L.marker([51.5, -0.09] ).addTo(map);
    /*
    markers.addLayer(marker);
    map.addLayer(markers);
    */

    console.log( "Here" )
    
   //var marker = L.marker([51.5, -0.09] ).addTo(map);
    //map.setView([43.64701, -79.39425], 15);
}

function addFoliumFunc( argMap ) {

    map = argMap;

    // Iframe Folium Map
    var outside = parent.document;

    map.on( "click" , eventClick);
    map.on( "mousemove", eventMouseMove ); 

    function eventClick(e) {
        //const marker = new L.marker(e.latlng, {
            //draggable: false,
        //}) //.addTo( map );
        outside.getElementById( "consoleFoliumMap" ).value += "Click on Folium Map on " + e.latlng.lat + ", " + e.latlng.lng + ".\n";


        //console.log( "" + parent.testArray )
    }

    function eventMouseMove( e ) {
        outside.getElementById( "txt_latAddFoliumFunc" ).value = ( e.latlng.lat ).toFixed(6) + "°"; 
        outside.getElementById( "txt_lngAddFoliumFunc" ).value = ( e.latlng.lng ).toFixed(6) + "°"; 
        outside.getElementById( "txt_zoomAddFoliumFunc" ).value = map.getZoom() + ""; 

    }

    //console.log( outside.getElementById( "txt_latAddFoliumFunc" ).value = "0.12" )

    //console.log( "::: " + outside.getElementById("foliumMap").lastChild );

    //Stato Ready 

    //console.log( "AAA " + outside.getElementById( "foliumMap" ).lastChild.lastChild.contentWindow ); // uguale a 
    //Fig  o DIV - Iframe - poi mappa 
    //console.log( $(this)[ 0 ] ) // Risposta JQuery che contiene Window ovvero Iframe 

    //console.log( "AAA " + outside.getElementById( "foliumMap" ).lastChild.lastChild.contentWindow.devicePixelRatio );


}
