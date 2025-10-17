
function addFoliumFunc( map ) {

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
}