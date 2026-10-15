
function calcolaCostoMinimoPerCombinazioniMarkerPOIAttivi() {
	
	return new Promise((resolve, reject) => 
	{
	
	print3("*** COMBINATION OF ACTIVE / INACTIVE POI MARKER ***");  
	
	rimuoviCostoMinimoAlgoritmi( false, false );  
	
	/*
	//
	array_costiAfferenza = [
		[ 12, 13, 6, 0, 1 ],
		[ 8, 4, 9, 1, 2 ], 
		[ 2, 6, 6, 0, 1 ],
		[ 3, 5, 2, 10, 8 ], 
		[ 8, 0, 5, 10, 8 ],
		[ 2, 0, 3, 4, 1 ]
	
	];
	
	array_costiAttivazioneManutenzione = [ 4, 3, 1, 4, 7 ]; 
	
	array_markerClienti = [ 0, 0, 0, 0, 0, 0 ]; 
	array_markerPOI = [ 0, 0, 0, 0, 0 ]; 
	//
	*/
	
	stato_calcoloCostoMinimo = true;
	
	if( array_markerClienti.length == 0 ) {
		print3( "The number of Customer Markers identified on the map is equal to 0; operation terminated."); 
		stato_calcoloCostoMinimo = false;
		terminaOperazione = false; 
		return; 
	}
	
	if( array_markerPOI.length == 0 ) {
		print3( "The number of POI Markers identified on the map is equal to 0; operation terminated.");
		stato_calcoloCostoMinimo = false;  
		terminaOperazione = false; 
		return; 
	}
	
	var maxCombBinarie = Math.pow( 2, array_markerPOI.length ); 
	
	var arrayComb = []; 
	for( var k = 0; k < array_markerPOI.length; k++ ) {
		arrayComb.push( 0 );
		
	}

	incrementaArray( arrayComb, 2 ); //Escludo la prima combinazione (nessun impianto attivo)
	
	var costoMinimoBinario = Number.POSITIVE_INFINITY;
	var array_costoMinimoBinario = []; 
	var sommaCostiSingolaComb = 0; 
	var array_costiAfferenzaSingolaComb = []; 
	var minimoRiga = null;  
	var array_costoMinimoBinarioSingolaComb = [];  
	
	var j = 1; //Escludo la prima combinazione (nessun impianto attivo)
	var iv = setInterval( function() {

	//for( var i = 1; i < maxCombBinarie - 1; i++ ) {
		
		if( terminaOperazione == true ) {
			print3("Operation interrupted"); 
			stato_calcoloCostoMinimo = false;  
			terminaOperazione = false; 
			clearInterval( iv );
			reject("Operazione interrotta");  
			return; 
		}
		
		//Inizializzazione
		array_costoMinimoBinarioSingolaComb = []; 
		
		sommaCostiSingolaComb = 0;
		
		array_costiAfferenzaSingolaComb = [];
		for( var riga = 0; riga < array_markerClienti.length; riga++ ) {
			array_costiAfferenzaSingolaComb.push( [ ] ); 
		}
		
		minimoRiga = null; 		
		
		//Costi Afferenza
		for( var riga = 0; riga < array_markerClienti.length; riga++ ) {
			for( var colonna = 0; colonna < arrayComb.length; colonna++ ) { //o array_markerPOI.length
				if( arrayComb[ colonna ] == 1 ) {
					array_costiAfferenzaSingolaComb[ riga ].push( array_costiAfferenza[ riga ][ colonna ] ); 
				} else if( arrayComb[ colonna ] == 0 ) {
					//
				}					
			}
			minimoRiga = Math.min( ...array_costiAfferenzaSingolaComb[ riga ] );

			sommaCostiSingolaComb = sommaCostiSingolaComb + minimoRiga; 
			
			array_costoMinimoBinarioSingolaComb.push( array_costiAfferenza[ riga ].indexOf( minimoRiga ) ); 
						
		}
		
		//Costi attivazione e manutenzione
		for( var colonna = 0; colonna < arrayComb.length; colonna++ ) {
			if( arrayComb[ colonna ] == 1 ) {
				sommaCostiSingolaComb = sommaCostiSingolaComb + array_costiAttivazioneManutenzione[ colonna ]; 
			}
		}
		
		if( sommaCostiSingolaComb < costoMinimoBinario ) {
			costoMinimoBinario = sommaCostiSingolaComb; 
			array_costoMinimoBinario = JSON.parse( JSON.stringify( array_costoMinimoBinarioSingolaComb ) );
			 
		}	
		
		inMappa( array_collegamentiTemporanei, "invisible" ); 
		array_collegamentiTemporanei = []; 
		
		for( var i = 0; i < array_costoMinimoBinarioSingolaComb.length; i++ ) {
				array_collegamentiTemporanei.push( ottieniPolilinea( [ array_markerPOI[ array_costoMinimoBinarioSingolaComb[ i ] ].getLatLng(), array_markerClienti[ i ].getLatLng() ] , "orange" ) ); 
				
		}
		
		inMappa( array_collegamentiTemporanei, "visible" ); 
		 
		if( j == ( maxCombBinarie - 1 ) ) {
			
			array_markerPOIAttivi = ordinaArray( JSON.parse( JSON.stringify( Array.from(new Set( array_costoMinimoBinario ) ) ) ) ); 
			
			array_costoMinimoPerPOI = array_costoMinimoBinario; 
			
			collegamentiInMappaMarkerPOIClienti(); 
			
			print3( 
				"Maximum number of binary combinations: " + maxCombBinarie + "\n" +  
				"Minimum cost [Euro]: " + costoMinimoBinario.toFixed(2) + "\n" + 
				"Minimum cost combination [MarkerNumber]: " + array_costoMinimoBinario
			); 
			
			stato_calcoloCostoMinimo = false;  
			terminaOperazione = false; 
			clearInterval( iv );
			resolve( "Operazione terminata" ); 
			//return;
		}
		
		if( j <= ( maxCombBinarie * 0.01 ) && maxCombBinarie > 1 ) {
			document.getElementById("progressBarCombinazioni").value = "0";
		} else {
			document.getElementById("progressBarCombinazioni").value = "" + parseInt( ( ( j + 1.0 ) / maxCombBinarie * 100.0 ), 10 ) ;
		}	
		
		document.getElementById("avanzamento").value = "" + ( j + 1.0).toLocaleString( 'it' ) + " / " + maxCombBinarie.toLocaleString( 'it' );
		 
		incrementaArray( arrayComb, 2 );
		j++; 
		
	}, 
	0); 
	
		
	}); 
	
	
	
}
