

async function cercaPercorsoOSRMSullaMappa( lat1, lng1, lat2, lng2 ) { 
	
	//OSRM longitude, latitude, longitude, latitude ... 
	const api = await fetch( "http://router.project-osrm.org/route/v1/" + profileOSRM + "/" + lng1 + "," + lat1 + ";" + lng2 + "," + lat2 + "?steps=false&overview=simplified&geometries=geojson", {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}//,
		//body:""
	});
	const risposta = await api.json();
	//const answer = api; 
	console.log( risposta ); 
	
	print4( "Request OSRM: http://router.project-osrm.org/route/v1/" + profileOSRM + "/" + lng1 + "," + lat1 + ";" + lng2 + "," + lat2 + "?steps=false&overview=simplified&geometries=geojson" );
	
	print4( "\tMeans of locomotion/Profile OSRM: " + profileOSRM ); 
	print4( "\tInitial charge level [%]: " + livelloCarica ); 
	print4( "\tKm range / autonomy generally expected for the vehicle [Km]: " + autonomiaMacchina.toFixed(3) )
	autonomiaPrevista = autonomiaMacchina * livelloCarica / 100.0;
	print4( "\tExpected initial Km range / autonomy [Km]: " + autonomiaPrevista.toFixed(3) ); 
	
	distanzaTotalePercorsa = 0.0; 
	
	var geometria = risposta[ "routes" ][0]["geometry"]["coordinates"]; 
	if( geometria.length > 0 ) {
		
		for( var i = 0; i < geometria.length ; i++ ) {
			var latPunto = geometria[ i ][1];  
			var lngPunto = geometria[ i ][0]; 
			array_puntiDelPercorso.push( [ lngPunto, latPunto ] ); 
			
			if( i >= 1 ) {
				distanzaTotalePercorsa = distanzaTotalePercorsa + ottieniDistanza( 
					L.latLng( array_puntiDelPercorso[ i ][1], array_puntiDelPercorso[ i ][0] ), 
					L.latLng( array_puntiDelPercorso[ i - 1 ][1], array_puntiDelPercorso[ i - 1 ][0] ) 
				);
			}
		} 
		
		print4( "\tTotal distance of the route [Km]: " + distanzaTotalePercorsa.toFixed(3) );
		
		//console.log( array_puntiDelPercorso.length ); 
		
		var trattoUltimo = 0;  
		var trattoSeguente = 0; 
		var verificaDistanze = 0; 
		var distanzaPercorsa = 0; 
		var distanzaAllaRicarica = 0;
		var MarkerAllaRicarica = null;
		//autonomiaPrevista
		
		for( var i = 0; i < array_puntiDelPercorso.length; i++ ) {   
			 
			if( i >= 1 ) {
				trattoUltimo = ottieniDistanza( 
					L.latLng( array_puntiDelPercorso[ i ][1], array_puntiDelPercorso[ i ][0] ), 
					L.latLng( array_puntiDelPercorso[ i - 1 ][1], array_puntiDelPercorso[ i - 1 ][0] ) 
				);
			} 
			distanzaPercorsa = distanzaPercorsa + trattoUltimo; 
			distanzaAllaRicarica = autonomiaPrevista - distanzaPercorsa;   
			
			if( i < ( array_puntiDelPercorso.length - 1) ) { 
				trattoSeguente = ottieniDistanza( 
					L.latLng( array_puntiDelPercorso[ i + 1 ][1], array_puntiDelPercorso[ i + 1 ][0] ), 
					L.latLng( array_puntiDelPercorso[ i ][1], array_puntiDelPercorso[ i ][0] ) 
				); 
				
				verificaDistanze = distanzaAllaRicarica - trattoSeguente;   
				
				if( verificaDistanze < 0.0 ) {
					var latMarker = array_puntiDelPercorso[ i ][1]; 
					var lngMarker = array_puntiDelPercorso[ i ][0];
					MarkerAllaRicarica = ottieniMarker( [ latMarker, lngMarker ] , null, "red" );
					MarkerAllaRicarica.getPopup().setContent(
						"Coordinates: " + latMarker.toFixed(6) + ", " + lngMarker.toFixed(6) + "<br>" +
						"Distance traveled since start or last charge [Km]: " + distanzaPercorsa.toFixed(3) + "<br>" +   
						"Charging needed in [Km]: " + distanzaAllaRicarica.toFixed(3)
					);
					array_markerAllaRicarica.push( MarkerAllaRicarica );
					inMappa( array_markerAllaRicarica , "visible" ); 
					
					var trattoUltimo = 0;  
					var trattoSeguente = 0; 
					var verificaDistanze = 0; 
					var distanzaPercorsa = 0; 
					var distanzaAllaRicarica = 0;
					var MarkerAllaRicarica = null;
					autonomiaPrevista = autonomiaMacchina; 
					
				}
			}
					
		}
		
		lineString_trovaPercorsoSullaMappa = new Turf ( turf.lineString( array_puntiDelPercorso ), "blue" ); 
		inMappa( [ lineString_trovaPercorsoSullaMappa.geoJSON ], "visible" );  
		
		variazioneTurfIntersezioni(); 
	}  
	
}

