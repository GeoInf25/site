
function risultatiCalcolaMetodologiaAHP() {
	
	var select_risultatiMarkerClienteAHP = document.getElementById( "select_risultatiMarkerClienteAHP" );
	
	if( select_risultatiMarkerClienteAHP.selectedIndex >= 1 ) {
		var riga = select_risultatiMarkerClienteAHP.options[ select_risultatiMarkerClienteAHP.selectedIndex ].value;
		
		if( array_datiAHP.length == 0 ) {
			print3( "Process data using AHP Methodology; operation interrupted." ); 
			return; 
		}
		
		if( array_datiAHP[ riga ][ "numPOI" ].length == 0 ) {
			print3( "Customer Marker " + riga + "without associated POI Markers, not present within the considered radius.");
			
		} else {
			
			print3( 
				"Results obtained on the Customer Marker " + riga + ":" + "\n" + 
				"Number of Customer Marker: " + array_datiAHP[ riga ][ "numCliente" ] + "\n" + 
				"Number of POI Markers associated within the considered radius: \n" + printVettoreColonna( array_datiAHP[ riga ][ "numPOI" ] ) + "\n" + 
				
				"Distance expected from each POI Marker: \n" + printVettoreColonna( array_datiAHP[ riga ][ "Dist" ] ) + "\n" +  
				"Priority Vector (Distance): \n" + printVettoreColonna( array_datiAHP[ riga ][ "DistPV" ] ) + "\n" + 
				"Priority Vector normalized (Distance): \n" + printVettoreColonna( array_datiAHP[ riga ][ "DistPVNorm" ] ) + "\n" + 
				
				"Activation/Maintenance Cost expected from each POI Marker: \n" + printVettoreColonna( array_datiAHP[ riga ][ "Catt" ] ) + "\n" + 
				"Priority Vector (Activation/Maintenance Cost): \n" + printVettoreColonna( array_datiAHP[ riga ][ "CattPV" ] ) + "\n" + 
				"Priority Vector normalized (Activation/Maintenance Cost): \n" + printVettoreColonna( array_datiAHP[ riga ][ "CattPVNorm" ] ) + "\n" + 
				
				"Total Cost (Afferent and Activation) expected from each POI Marker: \n" + printVettoreColonna( array_datiAHP[ riga ][ "Ctot" ] ) + "\n" + 
				"Priority Vector (Total Cost): \n" + printVettoreColonna( array_datiAHP[ riga ][ "CtotPV" ] ) + "\n" + 
				"Priority Vector normalized (Total Cost): \n" + printVettoreColonna( array_datiAHP[ riga ][ "CtotPVNorm" ] ) + "\n" + 
				
				"Plant Factor expected from each POI Marker: \n" + printVettoreColonna( array_datiAHP[ riga ][ "FattImp" ] ) + "\n" +  
				"Priority Vector (Plant Factor): \n" + printVettoreColonna( array_datiAHP[ riga ][ "FattImpPV" ] ) + "\n" + 
				"Priority Vector normalized (Plant Factor): \n" + printVettoreColonna( array_datiAHP[ riga ][ "FattImpPVNorm" ] ) + "\n" + 
				
				"Matrix containing Priority Vector of Alternatives: \n" + printMatrice2D( array_datiAHP[ riga ][ "AltPVNorm" ] ) + "\n" + 
				"Product of Priority Vector Matrixs relative to the Alternatives and the Criteria: \n" + printVettoreColonna( array_datiAHP[ riga ][ "RisPV" ] ) + "\n" + 
				"Alternative or POI Marker selected: \n" + array_datiAHP[ riga ][ "numPOISelezionato" ]
			);  
		}
		
		zoom = 16; 
		mappa.setView( [ array_markerClienti[ riga ].options.coordinate[ 0 ] , array_markerClienti[ riga ].options.coordinate[ 1 ] ], zoom );
		
	}
}

function calcolaMetodologiaAHP() {
	
	return new Promise((resolve, reject) => 
	{
	
	print3( "*** AHP METHODOLOGY ***" ); 
	
	if( CR == undefined ) {
		print3(
			"CR index not defined; operation interrupted. "
		); 	
		reject("Operazione interrotta");  
		return; 
	}
	
	if( CR > 0.1 ) {
		print3(
			"CR index higher than the limit threshold of 0.1; operation interrupted."
		); 	
		reject("Operazione interrotta");  
		return; 
	}
	
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
	
	var turfDistanza = document.getElementById("range_variazioneTurfDistanzaMarkerClienti").value / 1000.0; 
	if( turfDistanza == 0.0 ) {
		print3( "Expected distance from Customer Markers equal to 0.0; operation interrupted."); 
		reject("Operazione interrotta");  
		return; 
	}
	
	
	rimuoviCostoMinimoAlgoritmi( false, false );  	
	
	var maxDist = undefined; 
	var maxCatt = undefined; 
	var maxCtot = undefined; 
	var maxFattImp = undefined; 
	var sommaDistPV = 0.0; 
	var sommaCattPV = 0.0; 
	var sommaCtotPV = 0.0; 
	var sommaFattImpPV = 0.0; 
	
	var operazioniFinali = ( ) => {
		
		array_markerPOIAttivi = ordinaArray( JSON.parse( JSON.stringify( Array.from(new Set( array_costoMinimoPerPOI ) ) ) ) ); 
		
		if( array_markerPOIAttivi.indexOf( "Not_defined" ) >= 0 ) { //Non_definito
			array_markerPOIAttivi.splice( array_markerPOIAttivi.indexOf( "Not_defined" ), 1 ); //Non_definito
		}
	
		collegamentiInMappaMarkerPOIClienti(); 
		
		print3(
			"Minimum cost combination [MarkerNumber]: " + array_costoMinimoPerPOI 
		);
		
		var sommaDeiCostiPerCombinazioneFinale = 0.0; 
		
		//Costo Afferenza ( valutato per ogni singolo MarkerCliente e rispettivo MarkerPOI )
		for( var i = 0; i < array_costoMinimoPerPOI.length; i++ ) {
			
			if( array_costoMinimoPerPOI[ i ] == "Not_defined" ) { //Non_definito
				//
			} else {
				//sommaDeiCostiPerSingolaCombinazione = sommaDeiCostiPerSingolaCombinazione + array_costiAfferenza[ i ][ arrayDiCombinazioni[ i ] ]; 
				sommaDeiCostiPerCombinazioneFinale = sommaDeiCostiPerCombinazioneFinale + costoAfferenza( array_markerPOI[ array_costoMinimoPerPOI[ i ] ] ,  array_markerClienti[ i ] ); 
			}
		} 
		  
		//CostoAttivazioneManutenzione (valutato per ogni singolo MarkerPOI, non ripetuto nel caso in cui il MarkerPOI sia assegnato a piÃ¹ MarkerClienti )
		for( var i = 0; i < array_markerPOIAttivi.length; i++ ) {
			//sommaDeiCostiPerSingolaCombinazione = sommaDeiCostiPerSingolaCombinazione + array_costiAttivazioneManutenzione[ arrayDiCombinazioni[ i ] ];
			sommaDeiCostiPerCombinazioneFinale = sommaDeiCostiPerCombinazioneFinale + costoAttivazioneManutenzione( array_markerPOI[ array_markerPOIAttivi[ i ] ] );
			 
		} 
		 
		print3(
			"Cost identified based on the weights of the Alternatives and Criteria considered [Euro]: " + sommaDeiCostiPerCombinazioneFinale.toFixed( 2 ) 
		);
		
		clearInterval( iv );
		
		resolve( "Operazione terminata" ); 
		
	}
	
	var statoAvanzamento = () => {
		if( riga <= ( array_markerClienti.length * 0.01 ) && array_markerClienti.length > 1 ) {
			document.getElementById("progressBarCombinazioni").value = "0";
		} else {
			document.getElementById("progressBarCombinazioni").value = "" + parseInt( ( ( riga + 1.0 ) / array_markerClienti.length * 100.0 ), 10 ) ;
		}	
		
		document.getElementById("avanzamento").value = "" + ( riga + 1.0).toLocaleString( 'it' ) + " / " + array_markerClienti.length.toLocaleString( 'it' );
	}
	
	//for( var riga = 0; riga < array_markerClienti.length; riga++ ) {
	var riga = 0; 
	var iv = setInterval( function() {
		
		if( terminaOperazione == true ) {
			print1("Operation interrupted"); 
			terminaOperazione = false; 
			clearInterval( iv );
			reject("Operazione interrotta");  
			return;
		}
		
		array_datiAHP.push( 
			{ 
				"numCliente" : riga , 
				"numPOI" : new Array(), 
				"Dist" : new Array(), 
				"Catt" : new Array(), 
				"Ctot" : new Array(), 
				"FattImp" : new Array(), 
				"DistPV" : new Array(), 
				"CattPV" : new Array(), 
				"CtotPV" : new Array(), 
				"FattImpPV" : new Array(), 
				"DistPVNorm" : new Array(), 
				"CattPVNorm" : new Array(), 
				"CtotPVNorm" : new Array(), 
				"FattImpPVNorm" : new Array(),
				"AltPVNorm" : new Array( ), //Array bidimensionale
				"RisPV": new Array( ), 
				"numPOISelezionato" : undefined
			}	
		); 
		
		//
		
		for( var colonna = 0; colonna < array_markerPOI.length; colonna++ ) {
			
			if( turf.booleanPointInPolygon( turf.point( [ array_markerPOI[ colonna ].options.coordinate[ 1 ], array_markerPOI[ colonna ].options.coordinate[ 0 ] ] ), array_markerClienti[ riga ].options.turfDistanza.turf ) == true ) {
				array_datiAHP[ riga ][ "numPOI" ].push( array_markerPOI[ colonna ].options.numeroMarkerInserimento ); 
				array_datiAHP[ riga ][ "Dist" ].push( array_distanzaClientiPOI[ riga ][ colonna ] );
				array_datiAHP[ riga ][ "Catt" ].push( array_costiAttivazioneManutenzione[ colonna ] );
				array_datiAHP[ riga ][ "Ctot" ].push( array_costiAfferenza[ riga ][ colonna ] + array_costiAttivazioneManutenzione[ colonna ] );
				array_datiAHP[ riga ][ "FattImp" ].push( array_markerPOI[ colonna ].options.fattoreImpianto ); 	
			} 
		}
		
		if( array_datiAHP[ riga ][ "numPOI" ].length == 0 ) {
			print3( "Customer Marker " + riga + " without associated POI Markers, not present in the considered radius.");
			
			array_costoMinimoPerPOI.push( "Not_defined" ); //Non_definito 
				
		} else {
			
			maxDist = undefined; 
			maxCatt = undefined; 
			maxCtot = undefined; 
			maxFattImp = undefined; 
			sommaDistPV = 0.0; 
			sommaCattPV = 0.0; 
			sommaCtotPV = 0.0; 
			sommaFattImpPV = 0.0; 
			
			maxDist = Math.max( ...array_datiAHP[ riga ][ "Dist" ] ); 
			
			for( var indice = 0; indice < array_datiAHP[ riga ][ "Dist" ].length; indice++ ) {
				array_datiAHP[ riga ][ "DistPV" ].push( maxDist / array_datiAHP[ riga ][ "Dist" ][ indice ] );
				sommaDistPV = sommaDistPV + array_datiAHP[ riga ][ "DistPV" ][ indice ];   
			}
			maxCatt = Math.max( ...array_datiAHP[ riga ][ "Catt" ] ); 
			for( var indice = 0; indice < array_datiAHP[ riga ][ "Catt" ].length; indice++ ) {
				array_datiAHP[ riga ][ "CattPV" ].push( maxCatt / array_datiAHP[ riga ][ "Catt" ][ indice ] );
				sommaCattPV = sommaCattPV + array_datiAHP[ riga ][ "CattPV" ][ indice ];   
			}
			maxCtot = Math.max( ...array_datiAHP[ riga ][ "Ctot" ] ); 
			for( var indice = 0; indice < array_datiAHP[ riga ][ "Ctot" ].length; indice++ ) {
				array_datiAHP[ riga ][ "CtotPV" ].push( maxCtot / array_datiAHP[ riga ][ "Ctot" ][ indice ] ); 
				sommaCtotPV = sommaCtotPV + array_datiAHP[ riga ][ "CtotPV" ][ indice ]; //DistPV
			}
			maxFattImp = Math.max( ...array_datiAHP[ riga ][ "FattImp" ] ); 
			for( var indice = 0; indice < array_datiAHP[ riga ][ "FattImp" ].length; indice++ ) {
				array_datiAHP[ riga ][ "FattImpPV" ].push( maxFattImp / array_datiAHP[ riga ][ "FattImp" ][ indice ] ); 
				sommaFattImpPV = sommaFattImpPV + array_datiAHP[ riga ][ "FattImpPV" ][ indice ];  
			}
			
			//Valori normalizzati (sommatoria pari a 1)
			for( var indice = 0; indice < array_datiAHP[ riga ][ "DistPV" ].length; indice++ ) {
				array_datiAHP[ riga ][ "DistPVNorm" ].push( array_datiAHP[ riga ][ "DistPV" ][ indice ] / sommaDistPV );
			 }
			for( var indice = 0; indice < array_datiAHP[ riga ][ "CattPV" ].length; indice++ ) {
				array_datiAHP[ riga ][ "CattPVNorm" ].push( array_datiAHP[ riga ][ "CattPV" ][ indice ] / sommaCattPV );
			 }
			for( var indice = 0; indice < array_datiAHP[ riga ][ "CtotPV" ].length; indice++ ) {
				array_datiAHP[ riga ][ "CtotPVNorm" ].push( array_datiAHP[ riga ][ "CtotPV" ][ indice ] / sommaCtotPV );
			 }
			for( var indice = 0; indice < array_datiAHP[ riga ][ "FattImpPV" ].length; indice++ ) {
				array_datiAHP[ riga ][ "FattImpPVNorm" ].push( array_datiAHP[ riga ][ "FattImpPV" ][ indice ] / sommaFattImpPV );
			 }
		
			//Matrice Alternative 
			for( var indice = 0; indice < array_datiAHP[ riga ][ "numPOI" ].length; indice++ ) { //righe Matrice Alternative
				array_datiAHP[ riga ][ "AltPVNorm" ].push( new Array( 4 ) ); //Colonne Matrice Alternative (numero Criteri) 
				array_datiAHP[ riga ][ "AltPVNorm" ][ indice ][ 0 ] = array_datiAHP[ riga ][ "DistPVNorm" ][ indice ]; 
				array_datiAHP[ riga ][ "AltPVNorm" ][ indice ][ 1 ] = array_datiAHP[ riga ][ "CattPVNorm" ][ indice ]; 
				array_datiAHP[ riga ][ "AltPVNorm" ][ indice ][ 2 ] = array_datiAHP[ riga ][ "CtotPVNorm" ][ indice ]; 
				array_datiAHP[ riga ][ "AltPVNorm" ][ indice ][ 3 ] = array_datiAHP[ riga ][ "FattImpPVNorm" ][ indice ]; 
			}
			
			array_datiAHP[ riga ][ "RisPV" ] = JSON.parse( JSON.stringify( prodottoMatrici( array_datiAHP[ riga ][ "AltPVNorm" ] , criteriPV ) ) ); 
			
			array_datiAHP[ riga ][ "numPOISelezionato" ] = array_datiAHP[ riga ][ "numPOI" ][ array_datiAHP[ riga ][ "RisPV" ].indexOf( Math.max( ...array_datiAHP[ riga ][ "RisPV" ] ) ) ]; 
			array_costoMinimoPerPOI.push( array_datiAHP[ riga ][ "numPOISelezionato" ] );  
			
		}
		
		//Stato avanzamento
		statoAvanzamento();
		
		if( riga == ( array_markerClienti.length - 1 ) ) {
			
			operazioniFinali(); 
			return; 
		}
		
		riga = riga + 1;
		
	}, 
	0); 
	
	
	/*
	print3( sommaDistPV );
	print3( sommaCattPV );
	print3( sommaCtotPV );
	print3( sommaFattImpPV );
	print3( array_datiAHP[ 0 ][ "Dist" ] );
	print3( array_datiAHP[ 0 ][ "Catt" ] );
	print3( array_datiAHP[ 0 ][ "Ctot" ] );
	print3( array_datiAHP[ 0 ][ "FattImp" ] );
	print3( array_datiAHP[ 0 ][ "DistPV" ] );
	print3( array_datiAHP[ 0 ][ "CattPV" ] );
	print3( array_datiAHP[ 0 ][ "CtotPV" ] );
	print3( array_datiAHP[ 0 ][ "FattImpPV" ] );
	print3( array_datiAHP[ 0 ][ "DistPVNorm" ] );
	print3( array_datiAHP[ 0 ][ "CattPVNorm" ] );
	print3( array_datiAHP[ 0 ][ "CtotPVNorm" ] );
	print3( array_datiAHP[ 0 ][ "FattImpPVNorm" ] );
	print3("AltPVNorm: " + array_datiAHP[ 0 ][ "AltPVNorm" ] );
	
	print3( "criteriPV: " + criteriPV );
	*/
	
	});
	
}


