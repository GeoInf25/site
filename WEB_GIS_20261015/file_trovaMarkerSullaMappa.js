

async function trovaMarkerSullaMappa( ) {

	rimuoviMarkerSullaMappa(); 
	
	latNE = mappa.getBounds()["_northEast"]["lat"] ; 
	lngNE = mappa.getBounds()["_northEast"]["lng"] ; 
	latSW = mappa.getBounds()["_southWest"]["lat"] ; 
	lngSW = mappa.getBounds()["_southWest"]["lng"] ;
	
	var altezzaArea = ottieniDistanza( L.latLng( latNE, lngSW ), L.latLng( latSW, lngSW ) ) ;
	var baseArea= ottieniDistanza(  L.latLng( latSW, lngNE ), L.latLng( latSW, lngSW ) ) ; 
	
	areaInMappa = parseFloat( (altezzaArea * baseArea).toFixed(6), 10);
	document.getElementById("areaInMappa").value = "" + areaInMappa; 
	 
	var coloreMarker = ""; //Non significativo, presenza di icone 
	var tipoMarker = "";  
	
	var contatoreClienti = 0; 
	var contatorePOI = 0; 
	
	print1( "Waiting for results ..."); 
		
	const api = await fetch('https://www.overpass-api.de/api/interpreter?', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		//Esempio: body:" [out:json][timeout:60];node(48.865,2.25,48.9,2.27)[amenity=restaurant];out; "
		body:" [out:json][timeout:60];" + 
		"(" + 
		"node" + "[place~\"town|village\"]" + "(" + latSW + ", " + lngSW + ", " + latNE + ", " + lngNE + ")" + ";" + 
		"node" + "[shop=\"supermarket\"]" + "(" + latSW + ", " + lngSW + ", " + latNE + ", " + lngNE + ")" + ";" + 
		"node" + "[amenity=charging_station]" + "(" + latSW + ", " + lngSW + ", " + latNE + ", " + lngNE + ")" + ";" +
		"node" + "[amenity=parking]" + "(" + latSW + ", " + lngSW + ", " + latNE + ", " + lngNE + ")" + ";" +
		");" + 
		"out; "
	});
	const risposta = await api.json();
		
	console.log( risposta ); 
		
	if( risposta[ "elements" ].length == 0 ) {
		print1("Marker Search: no results found ..."); 
	
	} else if( risposta[ "elements" ].length > 0 ) {
		print1("Search: results found ..."); 
	
		for( var i = 0; i < risposta[ "elements" ].length; i++ ) {
			
			if( risposta[ "elements" ][ i ][ "tags" ][ "place" ] == "town" || risposta[ "elements" ][ i ][ "tags" ][ "place" ] == "village" ) {
				tipoMarker = "clienti"; 
			} else if( risposta[ "elements" ][ i ][ "tags" ][ "shop" ] == "supermarket" ) {
				tipoMarker = "mercatiPOI"; 
			} else if( risposta[ "elements" ][ i ][ "tags" ][ "amenity" ] == "charging_station" ) {
				tipoMarker = "stazioniEsistentiPOI"; 
			} else if( risposta[ "elements" ][ i ][ "tags" ][ "amenity" ] == "parking" ) {
				tipoMarker = "parcheggiPOI"; 
			}
			
			var lat = risposta[ "elements" ][ i ][ "lat" ]; 
			var lng = risposta[ "elements" ][ i ][ "lon" ]; 
			var amenity = ( risposta[ "elements" ][ i ][ "tags" ][ "amenity" ] == undefined ? "Not specified" : risposta[ "elements" ][ i ][ "tags" ][ "amenity" ] ); 
			var nome = ( risposta[ "elements" ][ i ][ "tags" ][ "name" ] == undefined ? "Not specified" : risposta[ "elements" ][ i ][ "tags" ][ "name" ] );  
			var marker = ottieniMarker( 
				[ lat, lng ],
				tipoMarker, 
				coloreMarker
				
			);

			marker.options.numeroMarkerInserimento = 
				( tipoMarker == "clienti" ? contatoreClienti : ( ( tipoMarker == "mercatiPOI" || tipoMarker == "stazioniEsistentiPOI"  || tipoMarker == "parcheggiPOI" ) ? contatorePOI : "Not specified" ) ); 
			marker.options.coordinate = [ parseFloat( lat.toFixed( 6 ) , 10 ), parseFloat( lng.toFixed( 6 ) , 10 )  ];  
			marker.options.amenity = amenity; 
			marker.options.nome = nome; 
			marker.options.tipoMarker = tipoMarker;
			 
			if( tipoMarker == "clienti" ) {
				marker.options.fattoreImpianto = fattoreImpiantoClienti; 
			} else if( tipoMarker == "mercatiPOI" ) {
				marker.options.fattoreImpianto = fattoreImpiantoMercatiPOI; 
			} else if( tipoMarker == "stazioniEsistentiPOI" ) {
				marker.options.fattoreImpianto = fattoreImpiantostazioniEsistentiPOI; 
			} else if( tipoMarker == "parcheggiPOI" ) {
				marker.options.fattoreImpianto = fattoreImpiantoParcheggiPOI; 
			} else {
				marker.options.fattoreImpianto = "Not specified"; 
			}
			
			marker.options.sommatoriaFlussi = 
				( tipoMarker == "clienti" ? "Not expected" : ( ( tipoMarker == "mercatiPOI" || tipoMarker == "stazioniEsistentiPOI"  || tipoMarker == "parcheggiPOI" ) ? sommatoriaFlussi : "Not specified" ) ); 
			
			marker.options.fattorePendolarismo = 
				( tipoMarker == "clienti" ? "Not expected" : ( ( tipoMarker == "mercatiPOI" || tipoMarker == "stazioniEsistentiPOI"  || tipoMarker == "parcheggiPOI" ) ? fattorePendolarismo : "Not specified" ) );
				
			marker.options.turfDistanza = 
				new Turf( 
					turf.circle( [ marker.options.coordinate[ 1 ], marker.options.coordinate[ 0 ] ] , 0.2, {steps: 250, units: 'kilometers' } ) ,
					"green"
				); 
				
			aggiornaPopupSingoloMarker( marker ); 

			if( tipoMarker == "clienti" ) {
				
				var select_risultatiMarkerClienteAHP = document.getElementById( "select_risultatiMarkerClienteAHP" );
				var option = document.createElement( "option" ); 
				option.value = "" + contatoreClienti; 
				option.text = "Customer Marker " + contatoreClienti; 
				select_risultatiMarkerClienteAHP.add( option ); 
								
				array_markerClienti.push( marker ); 
				contatoreClienti++; 
				
			} else if( tipoMarker == "mercatiPOI" || tipoMarker == "stazioniEsistentiPOI"  || tipoMarker == "parcheggiPOI" ) {
				array_markerPOI.push( marker );  
				contatorePOI++; 
			}
		 
		}
		  
		
	}
	
	inMappa( array_markerClienti, "visible" ); 
	print1("Number of Customers Markers on map: " + array_markerClienti.length ); 
		
	densitaAbitativa = parseFloat( ( array_markerClienti.length * numeroClientiPerComunita / areaInMappa ).toFixed(6), 10 );
	document.getElementById("densitaAbitativa").value = "" + densitaAbitativa;  
	
	inMappa( array_markerPOI, "visible" ); 
	print1("Number of POI Markers on map (Points Of Interest, i.e. markets, existing charging stations, car parks) " + array_markerPOI.length );  
	
	calcolaMatriciDiCosti(); 
	
}

