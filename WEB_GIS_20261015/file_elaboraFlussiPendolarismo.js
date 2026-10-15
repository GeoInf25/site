

function elaboraFlussiPendolarismo( text ) {
	
	document.getElementById( "input_file" ).value = ""; 
	
	var datiCSV = []; 
	var datiSSL = []; 
	
	var righe = text.split( "\n"); 
	
	//Posizione 0 - Intestazione
	
	for( i = 1; i < righe.length; i++ ) {
		var temp = righe[ i ].split( ";" ); 
		if( temp.length == 1 ) {
			//
		} else {
			datiCSV.push(  righe[ i ].split( ";" ) );
		}
	}
	
	for( var i = 0; i < datiCSV.length; i++ ) {
		datiSSL.push ( 
			{
				"origineNome": datiCSV[i][ 2 ], 
				"destinazioneNome": datiCSV[i][ 4 ],
				"origineCoord": new L.latLng( parseFloat( datiCSV[i][ 16 ], 10) , parseFloat( datiCSV[i][ 15 ], 10 ) ), //Coord SSL Origine
				"destinazioneCoord": new L.latLng( parseFloat( datiCSV[i][ 18 ], 10) , parseFloat( datiCSV[i][ 17 ], 10 ) ), //Coord SSL Destinazione
				"flusso" : parseInt( datiCSV[i][ 6 ], 10 ) //Flussi totali
			}
		);   
	}
	
	var areaDiRicerca = turf.polygon( 
		[ [ 
		[ parseFloat( mappa.getBounds().getNorthWest().lng - 0.07 , 10), parseFloat( mappa.getBounds().getNorthWest().lat + 0.07 , 10) ] , 
		[ parseFloat( mappa.getBounds().getNorthEast().lng + 0.07 , 10), parseFloat( mappa.getBounds().getNorthEast().lat + 0.07 , 10) ] ,
		[ parseFloat( mappa.getBounds().getSouthEast().lng + 0.07 , 10), parseFloat( mappa.getBounds().getSouthEast().lat - 0.07 , 10) ] ,
		[ parseFloat( mappa.getBounds().getSouthWest().lng - 0.07 , 10), parseFloat( mappa.getBounds().getSouthWest().lat - 0.07 , 10) ] ,
		[ parseFloat( mappa.getBounds().getNorthWest().lng - 0.07 , 10), parseFloat( mappa.getBounds().getNorthWest().lat + 0.07 , 10) ] 
		] ]
	);
	
	//var poligono = new Turf( areaDiRicerca, "orange" );
	//inMappa( [ poligono.geoJSON ] , "visible" ); 
	 
	for( var i = 0; i < datiSSL.length; i++ ) {
		
		var origine = turf.point( [ parseFloat( datiSSL[ i ][ "origineCoord" ].lng, 10) , parseFloat( datiSSL[ i ][ "origineCoord" ].lat , 10) ] ); 
		var destinazione = turf.point( [ parseFloat( datiSSL[ i ][ "destinazioneCoord" ].lng , 10) , parseFloat( datiSSL[ i ][ "destinazioneCoord" ].lat , 10) ] ); 
		
		if( turf.booleanPointInPolygon( origine , areaDiRicerca ) == true || turf.booleanPointInPolygon( destinazione, areaDiRicerca ) == true ) {
		
		/*
		if( 
			( latOrigine >= latSWmod && latOrigine <= latNEmod ) && ( lngOrigine >= lngSWmod && lngOrigine <= lngNEmod ) ||
			( latDestinazione >= latSWmod && latDestinazione <= latNEmod ) && ( lngDestinazione >= lngSWmod && lngDestinazione <= lngNEmod )
		) {
		*/
		
			array_collegamentiFlussi.push( ottieniPolilinea( [ datiSSL[ i ][ "origineCoord" ] , datiSSL[ i ][ "destinazioneCoord" ] ] , "blue" ) ); 
			
			print2("Flow " + datiSSL[ i ]["origineNome"] + " - " + datiSSL[ i ]["destinazioneNome"] + " with a number of " + datiSSL[ i ]["flusso"] + " people/person added to map."); 
			
			for( var j = 0; j < array_markerPOI.length; j++ ) {
				
				var pt = turf.point( [ array_markerPOI[ j ].getLatLng().lng, array_markerPOI[ j ].getLatLng().lat ] );
				var line = turf.lineString([ [ datiSSL[ i ][ "origineCoord" ].lng, datiSSL[ i ][ "origineCoord" ].lat ] , [ datiSSL[ i ][ "destinazioneCoord" ].lng, datiSSL[ i ][ "destinazioneCoord" ].lat ] ]);

				var distanza = turf.pointToLineDistance( pt, line );
										 
				if( distanza < 6.0 ) {
					array_markerPOI[ j ].options.sommatoriaFlussi = array_markerPOI[ j ].options.sommatoriaFlussi + parseFloat( datiSSL[ i ][ "flusso" ] , 10); 
					array_markerPOI[ j ].options.fattorePendolarismo = parseFloat( ( 1 + array_markerPOI[ j ].options.sommatoriaFlussi / 1000.0 ).toFixed( 6 ), 10 );
					aggiornaPopupSingoloMarker( array_markerPOI[ j ] ); 
				}
				
			}
			
		}
		
	}
	
	if( array_collegamentiFlussi.length == 0 ) {
		print2("No pendularity flow detected on map."); 
		
	} else {
		calcolaMatriciDiCosti(); 
		inMappa( array_collegamentiFlussi, "visible" ); 
		
	}
	
	
}

