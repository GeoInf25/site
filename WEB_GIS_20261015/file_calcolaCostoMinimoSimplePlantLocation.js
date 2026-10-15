

function calcolaCostoMinimoSimplePlantLocation() {
	
	return new Promise((resolve, reject) => 
	{
	
	print3("*** SIMPLE PLANT LOCATION ALGORITHM ***"); 
	
	rimuoviCostoMinimoAlgoritmi( false, false );  
	
	/*
	//
	array_costiAfferenza = [
		[ 0, 5, 7, 3, 4, 9  ],
		[ 5, 0, 10, 6, 8, 5 ], 
		[ 7, 10, 0, 4, 7, 8 ],
		[ 3, 6, 4, 0, 2, 9 ], 
		[ 4, 8, 7, 2, 0, 6 ],
		[ 9, 5, 8, 9, 6, 0 ]
	
	];
	
	array_costiAttivazioneManutenzione = [ 7, 3, 8, 5, 10, 6 ]; 
	
	array_markerClienti = [ 0, 0, 0, 0, 0, 0 ]; 
	array_markerPOI = [ 0, 0, 0, 0, 0, 0 ]; 
	//
	*/
	
	/*
	//
	array_costiAfferenza = [
		[ 16750, 14600, 19250, 3800, 9220  ],
		[ 3200, 15520, 19200, 10840, 13168 ], 
		[ 8220, 11640, 17100, 6516, 8400 ],
		[ 9780, 600, 3000, 6270, 3048 ], 
		[ 8120, 3465, 6650, 4655, 2177 ],
		[ 30800, 13200, 8800, 25531, 19767 ]
	
	];
	
	array_costiAttivazioneManutenzione = [ 17000, 13500, 15000, 14000, 12000 ]; 
	
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
	
	var maxIterazioni = array_markerPOI.length; 
	
	var i; 
	var j; 
	var k; 
	
	var array_soluzioniPOI = [];  
	var array_soluzioniPOIRimanenti = new Array( array_markerPOI.length );  
	var contaPOIRimanentiUndefined = 0; 
	var array_w = new Array( array_markerPOI.length ); 
	//var array_I = new Array( array_markerPOI.length ); 
	var array_savings = new Array( array_markerPOI.length ); 
	var contaSavingsNegativi = 0; 
	var soluzioneTemporanea = null; 
	var costoMinimo = null; 
	var ripeti = true;
	var iterazione = 0;	
	
	var w = ( j ) => {
		var res = array_costiAttivazioneManutenzione[ j ]; 
		for( i = 0; i < array_markerClienti.length; i++ ) {
			res = res + array_costiAfferenza[ i ][ j ]; 
		}
		return res; 
	}
	
	var savings = ( j ) => {
		var res = 0; 
		var array_minCostiAfferenzaK = []; 
		var minCostiAfferenzaK = null; 
		for( i = 0; i < array_markerClienti.length; i++ ) {
			array_minCostiAfferenzaK = []; 
			for( indiceK = 0; indiceK < array_soluzioniPOI.length; indiceK++ ) {
				array_minCostiAfferenzaK.push( array_costiAfferenza[ i ][ array_soluzioniPOI[ indiceK ] ] ); 
			}
			 
			minCostiAfferenzaK = Math.min( ...array_minCostiAfferenzaK ); 
			res = res + Math.max( (minCostiAfferenzaK - array_costiAfferenza[ i ][ j ]) , 0 );
		}
		return( res - array_costiAttivazioneManutenzione[ j ] ); 
	}
	
	//inizializzazione 
	
	for( j = 0; j < array_markerPOI.length; j++ ) {
		array_soluzioniPOIRimanenti[ j ] = j; 
	}
	
	for( j = 0; j < array_markerPOI.length; j++ ) {
		array_w[ j ] = w( j ); 
	}
	costoMinimo = Math.min( ...array_w ); 
	soluzioneTemporanea = array_w.indexOf( costoMinimo ); 
	array_soluzioniPOI.push( soluzioneTemporanea ); 
	array_soluzioniPOIRimanenti[ soluzioneTemporanea ] = "Not_defined"; //Non_definito //undefined

	print3( 
		"Initialization of the Algorithm: " + "\n" +
		"Array_w containing the total costs (membership / connecting and activation) initially evaluated [Euro]: " + array_w.map( function( num ) { return (" " + num.toFixed(2)); } ) + "\n" +  
		"Minimum cost initially identified [Euro]: " + costoMinimo.toFixed(2) + "\n" + 
		"POI Marker part of the initial solution [MarkerNumber]: " + array_soluzioniPOI + "\n" + 
		"Remaining POI Markers [MarkerNumber]: " + array_soluzioniPOIRimanenti
	); 
	
	//Calcolo dei Savings con arresto
	
	var aggiornamentoProgressBar = ( ) => {
		if( contaSavingsNegativi <= ( maxIterazioni * 0.01 ) ) {
			document.getElementById("progressBarCombinazioni").value = "0";
		} else {
			document.getElementById("progressBarCombinazioni").value = "" + parseInt( ( ( contaSavingsNegativi ) / maxIterazioni * 100.0 ), 10 ) ;
		}	
		document.getElementById("avanzamento").value = "" + ( contaSavingsNegativi ).toLocaleString( 'it' ) + " / " + maxIterazioni.toLocaleString( 'it' );	
	}
	
	var operazioniFinali = ( ) => {
		print3( "Final results obtained: " + "\n" +  
			"Minimum cost identified [Euro]: " + costoMinimo.toFixed(2) + "\n" + //Soluzione1
			"Set of POI Markers forming part of the solution also defined as active POI Markers [MarkerNumber]: " + array_soluzioniPOI + "\n" + 
			"Set of POI Markers not part of the solution [MarkerNumber]: " + array_soluzioniPOIRimanenti 
		); 
	
		array_markerPOIAttivi = ordinaArray( JSON.parse( JSON.stringify( Array.from(new Set( array_soluzioniPOI ) ) ) ) ); 
			
		ricercaCollegamentiConCostoMinimoPOIAttivi(); //array_costoMinimoPerPOI, costoMinimoPerPOI //Soluzione2
		
		collegamentiInMappaMarkerPOIClienti(); 
	
		stato_calcoloCostoMinimo = false;  
		terminaOperazione = false; 
	
		print3(
			"SOLUTION N.1 of minimum cost calculated through Savings [Euro]: " + costoMinimo.toFixed(2) + "\n" + 
			"SOLUTION N.2 of minimum cost calculated through the solution envisaged for the systems considered active, evaluating the membership / connection and activation costs [Euro]: " + costoMinimoPerPOI.toFixed(2) 
		);  
	
		clearInterval( iv );
		resolve( "Operazione terminata" ); 
		//return;
		
	}
	
	//while( ripeti == true ) {
		
	var iv = setInterval( function() {
		
		if( ripeti == true ) {
			
			if( terminaOperazione == true ) {
				print3("Operation interrupted"); 
				stato_calcoloCostoMinimo = false;  
				terminaOperazione = false; 
				clearInterval( iv );
				reject("Operazione interrotta");  
				return;
			}
			
			contaPOIRimanentiUndefined = 0; 
			
			for( j = 0; j < array_soluzioniPOIRimanenti.length; j++ ) {
				if( array_soluzioniPOIRimanenti[ j ] == "Not_defined" ) { //Non_definito //undefined
					contaPOIRimanentiUndefined = contaPOIRimanentiUndefined + 1; 
				}
			}
			
			if( contaPOIRimanentiUndefined == array_soluzioniPOIRimanenti.length ) {
				ripeti = false; 
				print3( "No Markers detected in the set of remaining POI Markers." );   
				//clearInterval( iv );
				operazioniFinali(); 
				
			}
			
			contaSavingsNegativi = 0;
			
			for( j = 0; j < array_soluzioniPOIRimanenti.length; j++ ) {
				if( array_soluzioniPOIRimanenti[ j ] == "Not_defined" ) { //Non_definito //undefined
					array_savings[ j ] = Number.NEGATIVE_INFINITY; 
					
				} else {
					array_savings[ j ] = savings( j ); 
					 
				}
				
				if( array_savings[ j ] < 0.0 ) {
					contaSavingsNegativi = contaSavingsNegativi + 1; 
				}	
			}
			//print3( "array_savings " + printVettoreColonna( array_savings ) );
			
			aggiornamentoProgressBar(); 
			
			if( contaSavingsNegativi == array_soluzioniPOIRimanenti.length ) {
				ripeti = false;
				print3( 
					"The remaining Savings all take on a negative value." + "\n" + 
					"Savings remaining [Euro]: " + array_savings.map( function( num ) { return ( " " + num.toFixed(2) ); } ) 
				); 
				
				operazioniFinali(); 
				
			} else {
				costoMinimo = costoMinimo - Math.max( ...array_savings ); 
				soluzioneTemporanea = array_savings.indexOf( Math.max( ...array_savings ) );
				array_soluzioniPOI.push( soluzioneTemporanea ); 
				array_soluzioniPOIRimanenti[ soluzioneTemporanea ] = "Not_defined"; //Non_definito
				
				ripeti = true; 
			}
			
			iterazione = iterazione + 1; 
		}
	
	}, 
	0);
	
	}); 
	
}

