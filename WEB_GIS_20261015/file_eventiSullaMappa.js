

function eventiSullaMappa() {
	
	//MouseMove
	mappa.on( 'mousemove' , 
	function(e) {
		latitudine = e.latlng.lat.toFixed(6); 
		longitudine = e.latlng.lng.toFixed(6); 
		document.getElementById( 'label_coordinate' ).innerHTML = "Latitude, longitude, zoom: " + latitudine + " :: " + longitudine + " :: " + zoom;
		
		if( stato_calcolaDistanzaSullaMappa == true ) {
			if( array_calcolaDistanzaSullaMappa.length >= 1 ) {
				if( mappa.hasLayer( polilineaTemp_calcolaDistanzaSullaMappa ) ) { 
					inMappa( [ polilineaTemp_calcolaDistanzaSullaMappa ], "invisible" ); 
				}
				var ultimaPosizione = array_calcolaDistanzaSullaMappa.length - 1;  
				polilineaTemp_calcolaDistanzaSullaMappa = ottieniPolilinea( [ array_calcolaDistanzaSullaMappa[ ultimaPosizione ].getLatLng(), L.latLng( latitudine, longitudine ) ], "red" ); 	
				inMappa( [ polilineaTemp_calcolaDistanzaSullaMappa ], "visible" ); 
			}
			
		} else if ( stato_calcolaAreaSullaMappa == true ) {
			if( array_calcolaAreaSullaMappa.length == 1 ) {
				if( areaTemp_calcolaAreaSullaMappa.geoJSON != null && mappa.hasLayer( areaTemp_calcolaAreaSullaMappa.geoJSON ) ) { 
					inMappa( [ areaTemp_calcolaAreaSullaMappa.geoJSON ], "invisible" ); 
				}
				 
				areaTemp_calcolaAreaSullaMappa = new Turf(  turf.lineString( [ array_calcolaAreaSullaMappa[0], [ longitudine, latitudine ] ] ), "red" ); 
				inMappa( [ areaTemp_calcolaAreaSullaMappa.geoJSON ], "visible" ); 
				
					 
			} else if( array_calcolaAreaSullaMappa.length >= 2 ) {
				
				if( areaTemp_calcolaAreaSullaMappa.geoJSON != null && mappa.hasLayer( areaTemp_calcolaAreaSullaMappa.geoJSON ) ) { 
					inMappa( [ areaTemp_calcolaAreaSullaMappa.geoJSON ], "invisible" ); 
				}
				var ultimaPosizione = array_calcolaAreaSullaMappa.length - 1;
				var array_coordLngLat = [ ]; 
				for( var i = 0; i < array_calcolaAreaSullaMappa.length; i++ ) {
					array_coordLngLat.push( array_calcolaAreaSullaMappa[ i ] ); 
				}
				array_coordLngLat.push( [ longitudine, latitudine ] );
				array_coordLngLat.push( array_calcolaAreaSullaMappa[ 0 ] );
				
				areaTemp_calcolaAreaSullaMappa = new Turf( turf.polygon( [ array_coordLngLat ] ), "red" ); 
				inMappa( [ areaTemp_calcolaAreaSullaMappa.geoJSON ] , "visible" );   
			}
			
		}
		
	}
	); 	
	
	//Zoomend
	mappa.on('zoomend',
	function(e) {
		zoom = mappa.getZoom();  
		document.getElementById( 'label_coordinate' ).innerHTML = "Latitude, longitude, zoom: " + latitudine + " :: " + longitudine + " :: " + zoom;
	}
	); 

	//Click
	 mappa.on( 'click' , 
	 function(e) {
		
		//CalcolaArea
		if( stato_calcolaAreaSullaMappa == true ) {
			var lat = parseFloat( e.latlng.lat ); 
			var lng = parseFloat( e.latlng.lng ); 
			array_calcolaAreaSullaMappa.push( [ lng, lat ] );
			
			if( array_calcolaAreaSullaMappa.length >= 2 ) { 
				inMappa( [ areaTemp_calcolaAreaSullaMappa.geoJSON ] , "invisible" );   
				inMappa( [ area_calcolaAreaSullaMappa.geoJSON ] , "invisible" ); 
				if( array_calcolaAreaSullaMappa.length == 2 ) {
					 
					area_calcolaAreaSullaMappa = new Turf( turf.lineString( [ array_calcolaAreaSullaMappa[0], array_calcolaAreaSullaMappa[1] ] ) ); 
					inMappa( [ area_calcolaAreaSullaMappa.geoJSON ], "visible" );  
					areaSullaMappa = 0; 
				} else {
					var array_coordLngLat = [ ]; 
					for( var i = 0; i < array_calcolaAreaSullaMappa.length; i++ ) {
						array_coordLngLat.push( array_calcolaAreaSullaMappa[ i ] ); 
					}
					
					array_coordLngLat.push( array_calcolaAreaSullaMappa[ 0 ] );
					
					area_calcolaAreaSullaMappa = new Turf( turf.polygon( [ array_coordLngLat ] ) , "red" ); 
					inMappa( [ area_calcolaAreaSullaMappa.geoJSON ] , "visible" ); 
					
					areaSullaMappa = turf.area( area_calcolaAreaSullaMappa.turf ) / 1000000.0; 
				}
			}
			
		//CalcolaDistanza
		} else if( stato_calcolaDistanzaSullaMappa == true ) {
			
			var lat = parseFloat( e.latlng.lat ); 
			var lng = parseFloat( e.latlng.lng ); 
			var marker = ottieniMarker( [lat, lng], null, "red" )  
			array_calcolaDistanzaSullaMappa.push( marker );
			
			if( array_calcolaDistanzaSullaMappa.length >= 2 ) {  
				
				inMappa( [ polilineaTemp_calcolaDistanzaSullaMappa ], "invisible" );  
				inMappa( [ polilinea_calcolaDistanzaSullaMappa ], "invisible" );   
				
				var array_coordMarker = []; 
				distanzaSullaMappa = 0; 
				for( var i = 0; i < array_calcolaDistanzaSullaMappa.length; i++ ) {
					array_coordMarker.push( array_calcolaDistanzaSullaMappa[ i ].getLatLng() ); 
					if( i >= 1 ) { 
						distanzaSullaMappa = distanzaSullaMappa + ottieniDistanza( array_calcolaDistanzaSullaMappa[ i ].getLatLng(), array_calcolaDistanzaSullaMappa[ i - 1 ].getLatLng() );
					}
				}
				 
				polilinea_calcolaDistanzaSullaMappa = ottieniPolilinea( array_coordMarker , "red" );
				inMappa( [ polilinea_calcolaDistanzaSullaMappa ], "visible" );  
				
			} 
			
		//Trova Percorso
		} else if( stato_trovaPercorsoSullaMappa == 1 ) {
			if( array_inizioFinePercorso.length == 2 ) {
				rimuoviTrovaPercorsoSullaMappa();  
			} 
			var lat = parseFloat( e.latlng.lat ); 
			var lng = parseFloat( e.latlng.lng ); 
			var marker = ottieniMarker( [lat, lng], null, "green" ); 
			marker.getPopup().setContent(
				(array_inizioFinePercorso.length == 0 ? "Initial" :  "Final") + " coordinates" + ": " + lat.toFixed(6) + ", " + lng.toFixed(6)
			);
			array_inizioFinePercorso.push( marker );
			if( array_inizioFinePercorso.length == 1 ) {
				inMappa( [ array_inizioFinePercorso[ 0 ] ], "visible" ); 
			}
			if( array_inizioFinePercorso.length == 2 ) {  
				inMappa( [ array_inizioFinePercorso[ 1 ] ], "visible" );   
				cercaPercorsoOSRMSullaMappa( 
					array_inizioFinePercorso[0].getLatLng().lat, array_inizioFinePercorso[0].getLatLng().lng,  
					array_inizioFinePercorso[1].getLatLng().lat, array_inizioFinePercorso[1].getLatLng().lng
				); 
			}
			
		} else {
			
			print1("Click on map - latitude, longitude: " + latitudine + " :: " + longitudine ); 
		}
	});
}

