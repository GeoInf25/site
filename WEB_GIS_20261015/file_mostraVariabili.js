
function mostraMatricePOI( attributoMarkerPOI ) {
	
	var titoli = [
		[ "numeroMarkerInserimento" , "*** INSERTION NUMBER MARKER: " ], 
		[ "coordinate" , "*** MARKER POI COORDINATES [latitude, longitude]: " ],
		[ "amenity" , "*** AMENITY: " ], 
		[ "nome" , "*** NAME: " ], 
		[ "tipoMarker" , "*** MARKER TYPE: " ], 
		[ "fattoreImpianto" , "*** IMPLANT FACTOR: " ], 
		[ "sommatoriaFlussi" , "*** FLOW SUM (NUMBER OF PEOPLE): " ], 
		[ "fattorePendolarismo" , "*** COMMUTING FACTOR: " ], 
		[ "costiAttivazioneManutenzione", "*** ACTIVATION AND MAINTENANCE COST MATRIX [Euro]: " ]
	]; 
	var titolo = ""; 
	var res = ""; 
	var temp = ""; 
	
	if( attributoMarkerPOI == titoli[0][0] ) {
		titolo = titoli[ 0 ][ 1 ]; 
	} else if( attributoMarkerPOI == titoli[1][0] ) {
		titolo = titoli[ 1 ][ 1 ]; 
	} else if( attributoMarkerPOI == titoli[2][0] ) {
		titolo = titoli[ 2 ][ 1 ]; 	
	} else if( attributoMarkerPOI == titoli[3][0] ) {
		titolo = titoli[ 3 ][ 1 ]; 
	} else if( attributoMarkerPOI == titoli[4][0] ) {
		titolo = titoli[ 4 ][ 1 ]; 
	} else if( attributoMarkerPOI == titoli[5][0] ) {
		titolo = titoli[ 5 ][ 1 ];	
	} else if( attributoMarkerPOI == titoli[6][0] ) {
		titolo = titoli[ 6 ][ 1 ];
	} else if( attributoMarkerPOI == titoli[7][0] ) {
		titolo = titoli[ 7 ][ 1 ];
	} else if( attributoMarkerPOI == titoli[8][0] ) {
		titolo = titoli[ 8 ][ 1 ];	
		
	}
		
	//Intestazione
	res = res + titolo + "\n"; 
	for( var colonna = 0; colonna < array_markerPOI.length; colonna++ ) {
		if( colonna == 0 ) {
			temp = sprintf( " " );  
			res = res + temp; 
		}
		temp = sprintf( "POI" + colonna ); //+ "\t\t"; 
		res = res + temp;  
	}
	
	res = res + "\n"; 
	
	for( var colonna = 0; colonna < array_markerPOI.length; colonna++ ) {
		
		if( colonna == 0 ) {
			temp = sprintf( "----- " ); 
			res = res + temp; 
		}
		
		if( attributoMarkerPOI == titoli[0][0] ) {
			temp = sprintf( array_markerPOI[ colonna ].options.numeroMarkerInserimento ); //+ "\t\t"; 
		} else if( attributoMarkerPOI == titoli[1][0] ) {
			temp = sprintf( array_markerPOI[ colonna ].options.coordinate ); //+ "\t\t"; 
		} else if( attributoMarkerPOI == titoli[2][0] ) {
			temp = sprintf( array_markerPOI[ colonna ].options.amenity ); //+ "\t\t"; 	
		} else if( attributoMarkerPOI == titoli[3][0] ) {
			temp = sprintf( array_markerPOI[ colonna ].options.nome ); //+ "\t\t";
		} else if( attributoMarkerPOI == titoli[4][0] ) {
			//temp = sprintf( array_markerPOI[ colonna ].options.tipoMarker ); //+ "\t\t";	
			/*************************************************************************************/
			if( array_markerPOI[ colonna ].options.tipoMarker == "clienti" ) {
				temp = sprintf( "customers" ); //+ "\t\t";
			} else if( array_markerPOI[ colonna ].options.tipoMarker == "mercatiPOI" ) {
				temp = sprintf( "marketsPOI" ); //+ "\t\t";
			} else if( array_markerPOI[ colonna ].options.tipoMarker == "stazioniEsistentiPOI" ) {
				temp = sprintf( "existingStationsPOI" ); //+ "\t\t"; //existingChargingStationsPOI
			} else if( array_markerPOI[ colonna ].options.tipoMarker == "parcheggiPOI" ) {
				temp = sprintf( "parkingAreasPOI" ); //+ "\t\t";
			} else { //Non previsto
				temp = sprintf( "" ); //+ "\t\t";
			}  
			/*************************************************************************************/
			
		} else if( attributoMarkerPOI == titoli[5][0] ) {
			temp = sprintf( array_markerPOI[ colonna ].options.fattoreImpianto ); //+ "\t\t";
		} else if( attributoMarkerPOI == titoli[6][0] ) {
			temp = sprintf( array_markerPOI[ colonna ].options.sommatoriaFlussi ); //+ "\t\t";
		} else if( attributoMarkerPOI == titoli[7][0] ) {
			temp = sprintf( array_markerPOI[ colonna ].options.fattorePendolarismo ); //+ "\t\t";
		} else if( attributoMarkerPOI == titoli[8][0] ) {
			temp = sprintf( array_costiAttivazioneManutenzione[ colonna ].toFixed( 2 ) ); //+ "\t\t";
		}
		
		res = res + temp;   
	}
	
	res = res + "\n"; 
	res = res + "\n"; 
	
	testo_mostraVariabili = testo_mostraVariabili + res;  
	
}

function mostraVariabili() { 
	
	testo_mostraVariabili = "";
	localStorage.setItem("textAreaMostraVariabili", testo_mostraVariabili ); 
	
	var res0 = "";
	var res1 = "";  
	var temp = ""; 
	
	//Intestazione
	res0 = res0 + "*** POI - CUSTOMERS DISTANCE MATRIX [Km]: " + "\n"; 
	for( var colonna = 0; colonna < array_markerPOI.length; colonna++ ) {
		if( colonna == 0 ) { 
			temp = sprintf( " " );
			res0 = res0 + temp; 
		}
		temp = sprintf( "POI" + colonna ); //+ "\t\t"; 
		res0 = res0 + temp;  
	}
	
	res0 = res0 + "\n"; 
	
	for( var riga = 0; riga < array_markerClienti.length; riga++ ) {
		for( var colonna = 0; colonna < array_markerPOI.length; colonna++ ) {
			
			if( colonna == 0 ) {
				temp = sprintf( "Customer"+ riga ); //+ "\t\t";
				res0 = res0 + temp;   
			}
			
			temp = sprintf( array_distanzaClientiPOI[ riga ][ colonna ].toFixed( 3 ) ); //+ "\t\t"; 
			res0 = res0 + temp;  
		}
		res0 = res0 + "\n"; 
	}
	
	res0 = res0 + "\n"; 
	res0 = res0 + "\n"; 
	
	testo_mostraVariabili = testo_mostraVariabili + res0; 
	
	//Intestazione
	res1 = res1 + "*** AFFERENT / TRANSPORT / CONNECTION / MEMBERSHIP COST MATRIX [Euro]: " + "\n"; 
	for( var colonna = 0; colonna < array_markerPOI.length; colonna++ ) {
		if( colonna == 0 ) {
			//res1 = res1 + "\t\t"; 
			temp = sprintf( " " );
			res1 = res1 + temp; 
		}
		temp = sprintf( "POI" + colonna ); //+ "\t\t"; 
		res1 = res1 + temp;  
	}
	
	res1 = res1 + "\n"; 
	
	for( var riga = 0; riga < array_markerClienti.length; riga++ ) {
		for( var colonna = 0; colonna < array_markerPOI.length; colonna++ ) {
			
			if( colonna == 0 ) {
				temp = sprintf( "Customer"+ riga ); //+ "\t\t";
				res1 = res1 + temp;   
			}
			
			temp = sprintf( array_costiAfferenza[ riga ][ colonna ].toFixed( 2 ) ); //+ "\t\t"; 
			res1 = res1 + temp;  
		}
		res1 = res1 + "\n"; 
	}
	
	res1 = res1 + "\n"; 
	res1 = res1 + "\n"; 
	
	testo_mostraVariabili = testo_mostraVariabili + res1;
	
	mostraMatricePOI( "costiAttivazioneManutenzione" );
	mostraMatricePOI( "numeroMarkerInserimento" ); 
	mostraMatricePOI( "coordinate" ); 
	mostraMatricePOI( "amenity" ); 
	mostraMatricePOI( "tipoMarker" ); 
	mostraMatricePOI( "fattoreImpianto" ); 
	mostraMatricePOI( "sommatoriaFlussi" ); 
	mostraMatricePOI( "fattorePendolarismo" );
		
	localStorage.setItem("textAreaMostraVariabili", testo_mostraVariabili );
	window.open( "file_mostraVariabili.html","file_mostraVariabili","width=1000,height=450"); 
	
}