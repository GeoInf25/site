

map.addEventListener('mousemove', function( e ) {
    // 
    dataLatLngZoom[0].Coordinates[1] = ( e.latlng.lat ).toFixed( 6 ); //Lat
    dataLatLngZoom[0].Coordinates[3] = ( e.latlng.lng ).toFixed( 6 ); //Lng
    //Zoom [5]

	latLngZoom.setData( dataLatLngZoom ); 

});

map.addEventListener('zoomend', function( e ) {
    //Lat [1]
    //Lng [3]
    dataLatLngZoom[0].Coordinates[5] = ( map.getZoom() ).toFixed( 2 );  

	latLngZoom.setData( dataLatLngZoom ); 

});

map.on( "draw:created" , function( e ) {
    type = e.layerType; 
    layer = e.layer;
    
    jsonFeature = "" + JSON.stringify( layer.toGeoJSON() )

    tempMessage = `${ lang=='eng' ? "Type of Feature: " : "Tipo di Feature: " }` + type + "\n" + jsonFeature;
    
    if (layer instanceof L.Circle) {
        tempMessage = tempMessage + "\n" + `${ lang=='eng' ? "Radius of the Circle [meters]: " : "Raggio del Cerchio [metri]: " }` + layer.getRadius();
    }

    popup = L.popup().setContent( 
        tempMessage.replaceAll( "\n" , "<br>" )
    );

    layer.bindPopup( popup ); 
    //console.log( layer.toGeoJSON() );
    
    tempObj = {
        DateTime : getDateTime() , 
        Event : `${ lang=='eng' ? "Plot Feature on Map" : "Elemento grafico sulla Mappa" }` , 
        Message_ConsoleApp : tempMessage  

    };
    
    dataConsoleApp.unshift( tempObj );

    consoleApp.setData( dataConsoleApp );
    
    layerDrawItems.addLayer( layer ); 
}); 

map.on('click', function(e) {
			
    tempObj = {
        DateTime : getDateTime() , 
        Event : `${ lang=='eng' ? "Click on Map" : "Click sulla Mappa" }`,
        Message_ConsoleApp : ( `${ lang=='eng' ? "Map clicked at: " : "Mappa cliccata a: " }` + e.latlng.lat.toFixed( 6 ) + ", " + e.latlng.lng.toFixed( 6 ) ),
    }; 
    
    dataConsoleApp.unshift( tempObj ); //Inizio Array 

    consoleApp.setData( dataConsoleApp );

});


//mapEvents.js