
async function calcolaCostoMinimoPerGreedy() {
	
	print3("*** GREEDY ALGORITHM ***"); 
	
	if( varianteGreedy == "markerAttivi" ) {
		
		print3("*** Greedy Algorithm Variant: POI Markers considered Active ***"); 
		
		rimuoviCostoMinimoAlgoritmi( false, false );  
		 
		if( array_markerPOI.length == 0 ) {
			print3( "The number of POI Markers identified on the map is equal to 0; operation terminated."); 
			reject("Operazione interrotta");  
			return;  
		}
	
		if( array_markerClienti.length == 0 ) {
			print3( "The number of Customer Markers identified on the map is equal to 0; operation terminated."); 
			reject("Operazione interrotta");  
			return;
		}
		
		stato_calcoloCostoMinimo = true;  
		
		var array_markerPOIAttiviSelezionati = []; 
		var array_markerPOIAttiviRimasti = [];
		
		for( var i = 0; i < array_markerPOI.length; i++ ) {
			array_markerPOIAttiviRimasti.push( array_markerPOI[ i ] );
		}
		
		var costoMinimoPerPOIAttiviGreedy = Number.POSITIVE_INFINITY; 
		var array_costoMinimoPerPOIAttiviGreedy = []; 
		
		var iterazione = 1; 
		var ripeti = true;  
		
		var ripetizioneGreedy = ( ) => {
			
			return new Promise((resolve, reject) => 
			{
				//for( var i = 0; i < array_markerPOIAttiviRimasti.length; i++ ) { ... }
				var i = 0;
				var iv = setInterval( function() {
					
					if( terminaOperazione == true ) {
						print3("Operation interrupted"); 
						stato_calcoloCostoMinimo = false;  
						terminaOperazione = false; 
						clearInterval( iv );
						reject("Operazione interrotta");  
						return; 
					}
					
					if( array_markerPOIAttiviRimasti[ i ] == undefined ) {
						//
					} else {
						array_markerPOIAttiviSelezionati[ ultimoPOIAttivi ] = array_markerPOIAttiviRimasti[ i ];
						
						var temp = ""; 
						for( var cont = 0; cont < array_markerPOIAttiviSelezionati.length; cont++ ) {
							temp = temp + array_markerPOIAttiviSelezionati[ cont ].options.numeroMarkerInserimento + " ";  
						}
						temp = "Selected Markers [MarkerNumber]: " + temp; 
						print3( temp ); 
						
						rimuoviCostoMinimoAlgoritmi( false, false ); //true
						 
						//const risposta = await calcolaCostoMinimoPerPOISelezionati( array_markerPOISelezionati ); //aggiornamento costoMinimoPerPOI, array_costoMinimoPerPOI
						
						//Inizializzazione
						array_costoMinimoGreedySingolaComb = []; 
						sommaCostiSingolaComb = 0.0;
						
						array_costiAfferenzaSingolaComb = [];
						for( var riga = 0; riga < array_markerClienti.length; riga++ ) {
							array_costiAfferenzaSingolaComb.push( [ ] ); 
						}
						
						var minimoRiga = null; 		
						
						//Costi Afferenza
						for( var riga = 0; riga < array_markerClienti.length; riga++ ) {
							for( var colonna = 0; colonna < array_markerPOIAttiviSelezionati.length; colonna++ ) { 
								array_costiAfferenzaSingolaComb[ riga ].push( array_costiAfferenza[ riga ][ array_markerPOIAttiviSelezionati[colonna].options.numeroMarkerInserimento ] );
													
							}
							minimoRiga = Math.min( ...array_costiAfferenzaSingolaComb[ riga ] );
							print3( "\tSelected Customer Marker [MarkerNumber]: " + riga + "\n" + "\tminimum connection cost among the selected POI Markers [Euro]: " + minimoRiga.toFixed(2) ); 
				
							sommaCostiSingolaComb = sommaCostiSingolaComb + minimoRiga; 
							 
							array_costoMinimoGreedySingolaComb.push( array_costiAfferenza[ riga ].indexOf( minimoRiga ) ); //Questione indici Marker relativi al numero di inserimento 
							
						}
						 
						print3( "\tExpected minimum cost combination [MarkerNumber]: " + array_costoMinimoGreedySingolaComb ); 
						
						array_markerPOIAttiviSingolaComb = ordinaArray( JSON.parse( JSON.stringify( Array.from(new Set( array_costoMinimoGreedySingolaComb ) ) ) ) ); 
						for( var colonna = 0; colonna < array_markerPOIAttiviSingolaComb.length; colonna++ ) {
							sommaCostiSingolaComb = sommaCostiSingolaComb + array_costiAttivazioneManutenzione[ array_markerPOIAttiviSingolaComb[colonna] ];
						}
						
						print3( "\tTotal cost including membership / connection and activation cost [Euro]: " + sommaCostiSingolaComb.toFixed(2) ); 
						
						inMappa( array_collegamentiTemporanei, "invisible" ); 
						array_collegamentiTemporanei = []; 
						
						for( var pos = 0; pos < array_costoMinimoGreedySingolaComb.length; pos++ ) {
								array_collegamentiTemporanei.push( ottieniPolilinea( [ array_markerPOI[ array_costoMinimoGreedySingolaComb[ pos ] ].getLatLng(), array_markerClienti[ pos ].getLatLng() ] , "orange" ) ); 
								
						}
						inMappa( array_collegamentiTemporanei, "visible" ); 
						
						costoMinimoPerPOI = sommaCostiSingolaComb; 
						array_costoMinimoPerPOI = JSON.parse( JSON.stringify( array_costoMinimoGreedySingolaComb ) );		
						 
						if( costoMinimoPerPOI < costoMinimoPerPOIAttiviRipetizione ) {
							costoMinimoPerPOIAttiviRipetizione = costoMinimoPerPOI;
							array_costoMinimoPerPOIAttiviRipetizione = JSON.parse( JSON.stringify( array_costoMinimoPerPOI ) );	   
							indiceMarkerAttiviRipetizione = i; 
							
						}	
						
					}
					
					if( i <= ( array_markerPOIAttiviRimasti.length * 0.01 ) && array_markerPOIAttiviRimasti.length > 1 ) {
						document.getElementById("progressBarCombinazioni").value = "0";
					} else {
						document.getElementById("progressBarCombinazioni").value = "" + parseInt( ( ( i + 1.0 ) / array_markerPOIAttiviRimasti.length * 100.0 ), 10 ) ;
					}	
			
					document.getElementById("avanzamento").value = "" + ( i + 1.0).toLocaleString( 'it' ) + " / " + (array_markerPOIAttiviRimasti.length).toLocaleString( 'it' );
					
					if( i == ( array_markerPOIAttiviRimasti.length - 1) ) {
						clearInterval( iv );	
						resolve( "Operazione terminata" ); 
					}
					
					i++;
						
				},0);
					
					
				}); 
			
		}
		
		while( ripeti == true && iterazione <= array_markerPOIAttiviRimasti.length ) { //&& iterazione <= array_markerClienti.length  ) {
			
			array_markerPOIAttiviSelezionati.push( null ); 
			var ultimoPOIAttivi = array_markerPOIAttiviSelezionati.length - 1; 
			
			var costoMinimoPerPOIAttiviRipetizione = Number.POSITIVE_INFINITY; 
			var array_costoMinimoPerPOIAttiviRipetizione;
			var indiceMarkerAttiviRipetizione;
			
			///
			
			const risposta = await ripetizioneGreedy(); 
			
			///
			
			if( costoMinimoPerPOIAttiviRipetizione < costoMinimoPerPOIAttiviGreedy ) {
				print3( "New minimum cost detected, with consequent cost decrease."); 
				costoMinimoPerPOIAttiviGreedy = costoMinimoPerPOIAttiviRipetizione; 
				array_costoMinimoPerPOIAttiviGreedy = JSON.parse( JSON.stringify( array_costoMinimoPerPOIAttiviRipetizione ) );
				array_markerPOIAttiviSelezionati[ ultimoPOIAttivi ] = array_markerPOI[ indiceMarkerAttiviRipetizione ];
				array_markerPOIAttiviRimasti[ indiceMarkerAttiviRipetizione ] = undefined;
				ripeti = true; 
			} else {
				print3( "No further cost decreases were detected (absence of new minimum costs)."); 
				ripeti = false; 
			}
			
			print3( 
				"Greedy iteration: " + iterazione + "\n" +
				"Minimum cost detected by the Greedy algorithm [Euro]: " + costoMinimoPerPOIAttiviGreedy.toFixed(2) + "\n" +
				"Combination of Markers selected by the Greedy algorithm [MarkerNumber]: " + array_costoMinimoPerPOIAttiviGreedy + "\n"
			); 
			
			iterazione++; 
			
			
		}
		
		//Assegnazione risultati
		costoMinimoPerPOI = costoMinimoPerPOIAttiviGreedy; 
		array_costoMinimoPerPOI = JSON.parse( JSON.stringify( array_costoMinimoPerPOIAttiviGreedy ) ); 
		array_markerPOIAttivi = ordinaArray( JSON.parse( JSON.stringify( Array.from(new Set( array_costoMinimoPerPOI ) ) ) ) ); 
		
		collegamentiInMappaMarkerPOIClienti(); 
		
		//opzioneGreedy = false;
		stato_calcoloCostoMinimo = false;  
		//return; 
		
		
	} else if( varianteGreedy == "combinazioneMarker" ) {
	
		print3("*** Greedy Algorithm Variant: combination of POI Markers ***"); 
	
		rimuoviCostoMinimoAlgoritmi( false, true );  
		 
		if( array_markerPOI.length == 0 ) {
			print3( "The number of POI Markers identified on the map is equal to 0; operation terminated."); 
			reject("Operazione interrotta");  
			return;  
		}
	
		if( array_markerClienti.length == 0 ) {
			print3( "The number of Customer Markers identified on the map is equal to 0; operation terminated."); 
			reject("Operazione interrotta");  
			return;
		}
		
		stato_calcoloCostoMinimo = true; 
		opzioneGreedy = true; 
		
		var array_markerPOISelezionati = []; 
		var array_markerPOIRimasti = [];
		
		for( var i = 0; i < array_markerPOI.length; i++ ) {
			array_markerPOIRimasti.push( array_markerPOI[ i ] );
		}
		
		var costoMinimoPerPOIGreedy = Number.POSITIVE_INFINITY; //Precedente
		var array_costoMinimoPerPOIGreedy = []; 
		
		var iterazione = 1; 
		var ripeti = true;  
		
		while( ripeti == true && iterazione <= array_markerClienti.length  ) {
			
			array_markerPOISelezionati.push( null ); 
			var ultimoPOI = array_markerPOISelezionati.length - 1; 
			
			var costoMinimoPerPOIRipetizione = Number.POSITIVE_INFINITY; 
			var array_costoMinimoPerPOIRipetizione;
			var indiceMarkerRipetizione;
			
			for( var i = 0; i < array_markerPOIRimasti.length; i++ ) {
				
				if( array_markerPOIRimasti[ i ] == undefined ) {
					//
				} else {
					array_markerPOISelezionati[ ultimoPOI ] = array_markerPOIRimasti[ i ];
					
					var temp = ""; 
					for( var cont = 0; cont < array_markerPOISelezionati.length; cont++ ) {
						temp = temp + array_markerPOISelezionati[ cont ].options.numeroMarkerInserimento + " ";  
					}
					temp = "Selected Markers [MarkerNumber]: " + temp; 
					print3( temp ); 
					
					rimuoviCostoMinimoAlgoritmi( false, true );
					 
					const risposta = await calcolaCostoMinimoPerPOISelezionati( array_markerPOISelezionati ); //aggiornamento costoMinimoPerPOI, array_costoMinimoPerPOI
					 
					if( costoMinimoPerPOI < costoMinimoPerPOIRipetizione ) {
						costoMinimoPerPOIRipetizione = costoMinimoPerPOI;
						array_costoMinimoPerPOIRipetizione = [];
						for( var j = 0; j < array_costoMinimoPerPOI.length; j++ ) {
							array_costoMinimoPerPOIRipetizione.push( array_markerPOISelezionati[ array_costoMinimoPerPOI[ j ] ].options.numeroMarkerInserimento ); //Differenza Numerazione Greedy e Numerazione Inserimento  
						}   
						indiceMarkerRipetizione = i; 
						
					}	
					
				}
					
			}
			
			if( costoMinimoPerPOIRipetizione < costoMinimoPerPOIGreedy ) {
				print3( "New minimum cost detected, with consequent cost decrease."); 
				costoMinimoPerPOIGreedy = costoMinimoPerPOIRipetizione; 
				array_costoMinimoPerPOIGreedy = JSON.parse( JSON.stringify( array_costoMinimoPerPOIRipetizione ) );
				array_markerPOISelezionati[ ultimoPOI ] = array_markerPOI[ indiceMarkerRipetizione ];
				array_markerPOIRimasti[ indiceMarkerRipetizione ] = undefined;
				ripeti = true; 
			} else {
				print3( "No further cost decreases were detected (absence of new minimum costs)."); 
				ripeti = false; 
			}
			
			print3( 
				"Greedy iteration: " + iterazione + "\n" +
				"Minimum cost detected by the Greedy algorithm [Euro]: " + costoMinimoPerPOIGreedy.toFixed(2) + "\n" +
				"Combination of Markers selected by the Greedy algorithm [MarkerNumber]: " + array_costoMinimoPerPOIGreedy + "\n"
			); 
			
			iterazione++; 
			
			
		}
		
		//Assegnazione risultati
		costoMinimoPerPOI = costoMinimoPerPOIGreedy; 
		array_costoMinimoPerPOI = JSON.parse( JSON.stringify( array_costoMinimoPerPOIGreedy ) ); 
		array_markerPOIAttivi = ordinaArray( JSON.parse( JSON.stringify( Array.from(new Set( array_costoMinimoPerPOI ) ) ) ) ); 
		
		collegamentiInMappaMarkerPOIClienti(); 
		
		opzioneGreedy = false;
		stato_calcoloCostoMinimo = false; 
		
	} else {
		
		print3("Choose one of the possible options of the algorithm; operation terminated."); 
			
	}
		
}

