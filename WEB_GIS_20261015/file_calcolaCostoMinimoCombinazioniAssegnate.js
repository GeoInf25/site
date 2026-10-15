
async function calcolaCostoMinimoPerCombinazioni() {
	
	stato_calcoloCostoMinimo = true; 
	
	var array_markerPOISelezionati = array_markerPOI;
	
	rimuoviCostoMinimoAlgoritmi( false, false );  
	
	const risposta = await calcolaCostoMinimoPerPOISelezionati( array_markerPOISelezionati ); 
	
	stato_calcoloCostoMinimo = false; 
}

function calcolaCostoMinimoPerPOISelezionati( array_markerPOISelezionati ) {
	
	return new Promise((resolve, reject) => 
	{
		
	print3("*** COMBINATION OF ASSIGNED POI MARKER NUMBER ***"); 
	
	print3( "Number of POI Markers considered: " + array_markerPOISelezionati.length ); 
	
	if( array_markerPOISelezionati.length == 0 ) {
		print3( "The number of POI Markers identified on the map is equal to 0; operation terminated."); 
		reject("Operazione interrotta");  
		return;  
	}
	if( array_markerClienti.length == 0 ) {
		print3( "The number of Customer Markers identified on the map is equal to 0; operation terminated."); 
		reject("Operazione interrotta");  
		return;
	}
	
	var numeroDiCombinazioniMassimo = parseFloat( Math.pow( array_markerPOISelezionati.length , array_markerClienti.length ) , 10 );
	if( array_markerClienti.length == 0 ) {
		numeroDiCombinazioniMassimo = 0; 
	}
	
	var arrayDiCombinazioni = [ ]; 
	for( var i = 0; i < array_markerClienti.length; i++ ) {
		arrayDiCombinazioni.push( 0 );
	}
	
	var operazioniFinali = ( ) => {
		
		array_markerPOIAttivi = ordinaArray( JSON.parse( JSON.stringify( Array.from(new Set( array_costoMinimoPerPOI ) ) ) ) ); 
			
		collegamentiInMappaMarkerPOIClienti(); 
		
		print3(
			"\tAchieved results: " + "\n" + 
			"\tMinimum cost [Euro]: " + costoMinimoPerPOI.toFixed(2) + "\n" +
			"\tMinimum cost combination [MarkerNumber]: " + array_costoMinimoPerPOI 
		);
		
		clearInterval( iv );
		
		resolve( "Operazione terminata" ); 
		
	}
	
	var statoAvanzamento = () => {
		if( j <= ( numeroDiCombinazioniMassimo * 0.01 ) && numeroDiCombinazioniMassimo > 1 ) {
			document.getElementById("progressBarCombinazioni").value = "0";
		} else {
			document.getElementById("progressBarCombinazioni").value = "" + parseInt( ( ( j + 1.0 ) / numeroDiCombinazioniMassimo * 100.0 ), 10 ) ;
		}	
		
		document.getElementById("avanzamento").value = "" + ( j + 1.0).toLocaleString( 'it' ) + " / " + numeroDiCombinazioniMassimo.toLocaleString( 'it' );
	}
		
	var j = 0; 
	var iv = setInterval( function() {
		
		if( terminaOperazione == true ) {
			print1("Operation interrupted"); 
			terminaOperazione = false; 
			clearInterval( iv );
			reject("Operazione interrotta");  
			return;
		}
		
		//Verifica interruzione Greedy
		if( opzioneGreedy == true && j > 0 ) {
			var contatoreZeri = 0; 
			for( var i = 0; i < arrayDiCombinazioni.length; i++ ) {
				if( arrayDiCombinazioni[ i ] == 0 ) { 
					contatoreZeri = contatoreZeri + 1; 	
				}
			}
			
			if( contatoreZeri == arrayDiCombinazioni.length ) {
				statoAvanzamento(); 
				operazioniFinali(); 
				return;
			}
		} 
		
		//Esclusione combinazione iniziale per Marker medesimo con combinazioni successive
		if( opzioneGreedy == true && j == 0 && array_markerPOISelezionati.length >= 2 ) { //3
			j = incrementaArrayGreedy( arrayDiCombinazioni, array_markerPOISelezionati.length , j, numeroDiCombinazioniMassimo );	
		}
		
		var sommaDeiCostiPerSingolaCombinazione = 0.0; 
		
		//Costo Afferenza ( valutato per ogni singolo MarkerCliente e rispettivo MarkerPOI )
		for( var i = 0; i < arrayDiCombinazioni.length; i++ ) {
			//sommaDeiCostiPerSingolaCombinazione = sommaDeiCostiPerSingolaCombinazione + array_costiAfferenza[ i ][ arrayDiCombinazioni[ i ] ]; 
			sommaDeiCostiPerSingolaCombinazione = sommaDeiCostiPerSingolaCombinazione + costoAfferenza( array_markerPOISelezionati[ arrayDiCombinazioni[ i ] ] ,  array_markerClienti[ i ] ); 
		}
		 
		var arrayDiCombinazioniConDistintiPOI = Array.from(new Set( arrayDiCombinazioni ) ); 
		
		//CostoAttivazioneManutenzione (valutato per ogni singolo MarkerPOI, non ripetuto nel caso in cui il MarkerPOI sia assegnato a piÃ¹ MarkerClienti )
		for( var i = 0; i < arrayDiCombinazioniConDistintiPOI.length; i++ ) {
			//sommaDeiCostiPerSingolaCombinazione = sommaDeiCostiPerSingolaCombinazione + array_costiAttivazioneManutenzione[ arrayDiCombinazioni[ i ] ];
			sommaDeiCostiPerSingolaCombinazione = sommaDeiCostiPerSingolaCombinazione + costoAttivazioneManutenzione( array_markerPOISelezionati[ arrayDiCombinazioniConDistintiPOI[ i ] ] );
		} 
		
		if( opzioneGreedy == true ) {
			print3( 
				"\tCombination [MarkerNumber]: " + arrayDiCombinazioni + "\n" +
				"\tCost combination [Euro]: " + sommaDeiCostiPerSingolaCombinazione.toFixed(2)
			);
		}
		
		if( sommaDeiCostiPerSingolaCombinazione < costoMinimoPerPOI ) {
			costoMinimoPerPOI = parseFloat( sommaDeiCostiPerSingolaCombinazione.toFixed(2), 10); 
			array_costoMinimoPerPOI = JSON.parse( JSON.stringify( arrayDiCombinazioni ) ); 
			
			print3( 
				"\tNew minimum cost detected at iteration " + j + "\n" + 
				"\tMinimum cost [Euro]: " + costoMinimoPerPOI.toFixed(2) + "\n" +
				"\tMinimum cost combination [MarkerNumber]: " + array_costoMinimoPerPOI 
			);  
			
						
		}
		
		inMappa( array_collegamentiTemporanei, "invisible" ); 
		array_collegamentiTemporanei = []; 
		
		for( var i = 0; i < arrayDiCombinazioni.length; i++ ) {
			array_collegamentiTemporanei.push( ottieniPolilinea( [ array_markerPOISelezionati[ arrayDiCombinazioni[ i ] ].getLatLng(), array_markerClienti[ i ].getLatLng() ] , "orange" ) ); 
				
		}
		
		inMappa( array_collegamentiTemporanei, "visible" ); 		
		
		//Stato avanzamento
		statoAvanzamento();
		
		if( j == ( numeroDiCombinazioniMassimo - 1 ) ) {
			
			operazioniFinali(); 
			return; 
		}		
		
		if( opzioneGreedy == true ) {
			j = incrementaArrayGreedy( arrayDiCombinazioni, array_markerPOISelezionati.length , j, numeroDiCombinazioniMassimo );	
		} else { 
			incrementaArray( arrayDiCombinazioni, array_markerPOISelezionati.length );
			j++; 
		}
		
		
	}, 
	0); 
	
	}); 
	
	/*
	Esempio:
	var k = 0; 
	var iv = setInterval( function() { 
		k = k+1; 
		output.innerHTML = "" + k;
		k++; 
		if( k == 100000 ) 
			clearInterval( iv );
	},		
	1);
	*/
	
} 

