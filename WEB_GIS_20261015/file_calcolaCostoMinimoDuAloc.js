

function calcolaCostoMinimoDuAloc() {
	
	print3("*** LOWER BOUND VERIFICATION USING DU-ALOC ALGORITHM ***"); 
	
	rimuoviCostoMinimoAlgoritmi( false, false );  
	
	//v clienti, u impianti; 
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
	
	if( array_markerClienti.length == 0 ) {
		print3( "The number of Customer Markers identified on the map is equal to 0; operation terminated."); 
		//stato_calcoloCostoMinimo = false;
		//terminaOperazione = false; 
		return; 
	}
	
	if( array_markerPOI.length == 0 ) {
		print3( "The number of POI Markers identified on the map is equal to 0; operation terminated");
		//stato_calcoloCostoMinimo = false;  
		//terminaOperazione = false; 
		return; 
	}
	
	var u; 
	var v; 
	var s;
	
	var z = ( v ) => {
		return Math.min( ...array_costiAfferenza[ v ] ); 
	}
	
	var w = ( v, u ) => {  
		
		return Math.max( 0 , array_valoriIniziali[ v ] - array_costiAfferenza[ v ][ u ] ); 
		
	}
	
	var array_valoriIniziali = []; 
	for( v = 0; v < array_markerClienti.length; v++ ) {
		array_valoriIniziali.push( z( v ) ); 
	}	 
	
	var zmax = ( s ) => {
		var array_valoriMinimi = []; 
		
		for( u = 0; u < array_markerPOI.length; u++ ) { 
			var sommatoria = 0;
			for( v = 0; v < array_markerClienti.length; v++ ) {
				if( v == s ) {
					sommatoria = sommatoria + 0; 
				} else {
					sommatoria = sommatoria + w( v, u );
					 
				}				
			}
			
			array_valoriMinimi.push( array_costiAfferenza[ s ][ u ] + array_costiAttivazioneManutenzione[ u ] - sommatoria ); 
			 
		}
		
		return Math.min( ...array_valoriMinimi ); 
	} 
	
	for( s = 0; s < array_markerClienti.length; s++ ) {
		var risZMax = zmax( s ); 
		if( risZMax > array_valoriIniziali[ s ] ) {
			array_valoriIniziali[ s ] = risZMax; 
		} else {
			// 
		} 
	}
	
	//print3("valori aggiornati " + array_valoriIniziali ); 
	
	var valoreLowerBound = 0; 
	
	for( s = 0; s < array_markerClienti.length; s++ ) {
		valoreLowerBound = valoreLowerBound + array_valoriIniziali[ s ]; 
	}
	
	print3("Lower Bound identified [Euro]: " + valoreLowerBound.toFixed(2) ); 
	
}

