
function primoAvvio() {
	mappa = L.map('mappa' , { zoomDelta: 1.0 } ).setView( [ latitudine , longitudine ], zoom );
	mappaDiBase = L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' ); 
	mappaDiBase.addTo( mappa ); 
	
	L.control.scale().addTo( mappa );
	
	document.getElementById("numeroClientiPerComunita").value = "" + numeroClientiPerComunita; 
	document.getElementById("euroSpesiPerChilometroAutoElettrica").value = "" + euroSpesiPerChilometroAutoElettrica.toFixed( 2 ); 
	document.getElementById("costoAttivazioneManutenzioneImpianto1").value = "" + costoAttivazioneManutenzioneImpianto1.toFixed( 2 ); 
	document.getElementById("costoAttivazioneManutenzioneImpianto2").value = "" + costoAttivazioneManutenzioneImpianto2.toFixed( 2 ); 
	
	document.getElementById("fattoreImpiantoMercatiPOI").value = "" + fattoreImpiantoMercatiPOI.toFixed( 2 );
	document.getElementById("fattoreImpiantostazioniEsistentiPOI").value = "" + fattoreImpiantostazioniEsistentiPOI.toFixed( 2 );
	document.getElementById("fattoreImpiantoParcheggiPOI").value = "" + fattoreImpiantoParcheggiPOI.toFixed( 2 );
	
	document.getElementById("livelloCarica").value = "" + livelloCarica;
	
}

function calcolaDistanzaSullaMappa( ) {
	stato_calcolaDistanzaSullaMappa = !stato_calcolaDistanzaSullaMappa;  
	if( stato_calcolaDistanzaSullaMappa == true ) {
		document.getElementById("button_calcolaDistanzaSullaMappa").style.background='#ffa500';
		document.getElementById("button_calcolaDistanzaSullaMappa").innerHTML = "Stop"; 
		rimuoviCalcolaDistanzaSullaMappa();
		
	} else if( stato_calcolaDistanzaSullaMappa == false ) {  
		document.getElementById("button_calcolaDistanzaSullaMappa").style.background='#f0f0f0';
		document.getElementById("button_calcolaDistanzaSullaMappa").innerHTML = "DISTANCE";
		inMappa( [ polilineaTemp_calcolaDistanzaSullaMappa ], "invisible" );
		polilineaTemp_calcolaDistanzaSullaMappa = ottieniPolilinea( [ ], "" ); 
		print1( "Distance [Km]: " + distanzaSullaMappa.toFixed( 3 ) );
		
	}
}

function rimuoviCalcolaDistanzaSullaMappa() {
	inMappa( array_calcolaDistanzaSullaMappa, "invisible" );  
	array_calcolaDistanzaSullaMappa = []; 
	inMappa( [ polilinea_calcolaDistanzaSullaMappa ], "invisible" );  
	polilinea_calcolaDistanzaSullaMappa = ottieniPolilinea( [ ], "" ); 
	inMappa( [ polilineaTemp_calcolaDistanzaSullaMappa ], "invisible" );
	polilineaTemp_calcolaDistanzaSullaMappa = ottieniPolilinea( [ ], "" ); 
	distanzaSullaMappa = 0; 

}

function calcolaAreaSullaMappa( ) {
	stato_calcolaAreaSullaMappa = !stato_calcolaAreaSullaMappa;  
	if( stato_calcolaAreaSullaMappa == true ) {
		document.getElementById("button_calcolaAreaSullaMappa").style.background='#ffa500';
		document.getElementById("button_calcolaAreaSullaMappa").innerHTML = "Stop"; 
		rimuoviCalcolaAreaSullaMappa();
		
	} else if( stato_calcolaAreaSullaMappa == false ) {  
		document.getElementById("button_calcolaAreaSullaMappa").style.background='#f0f0f0';
		document.getElementById("button_calcolaAreaSullaMappa").innerHTML = "AREA";
		inMappa( [ areaTemp_calcolaAreaSullaMappa.geoJSON ], "invisible" );
		areaTemp_calcolaAreaSullaMappa = new Turf( null, null); 
		print1( "Area [Km^2]: " + areaSullaMappa.toFixed( 4 ) );
		
	}
}

function rimuoviCalcolaAreaSullaMappa() {  
	array_calcolaAreaSullaMappa = []; 
	inMappa( [ area_calcolaAreaSullaMappa.geoJSON ], "invisible" );  
	area_calcolaAreaSullaMappa = new Turf( null, null); 
	inMappa( [ areaTemp_calcolaAreaSullaMappa ], "invisible" );
	areaTemp_calcolaAreaSullaMappa = new Turf( null, null); 
	areaSullaMappa = 0; 

}

function trovaPercorsoSullaMappa( ) {
	stato_trovaPercorsoSullaMappa = !stato_trovaPercorsoSullaMappa; 
	if( stato_trovaPercorsoSullaMappa == true ) {
		document.getElementById("button_trovaPercorsoSullaMappa").style.background='#ffa500';
	} else {
		document.getElementById("button_trovaPercorsoSullaMappa").style.background='#f0f0f0';
		rimuoviTrovaPercorsoSullaMappa(); 
	}
	
}

function rimuoviTrovaPercorsoSullaMappa() { 
	inMappa( array_inizioFinePercorso, "invisible" );  
	array_inizioFinePercorso = []; 
	inMappa( array_markerAllaRicarica, "invisible" );  
	array_markerAllaRicarica = [];
	array_puntiDelPercorso = []; 
	//livelloCarica = 20; 
	//autonomiaMacchina = 100.0;
	//autonomiaPrevista = 20.0;
	//profileOSRM = "car";
	inMappa( [ lineString_trovaPercorsoSullaMappa.geoJSON ], "invisible" ); 
	lineString_trovaPercorsoSullaMappa = new Turf( null, null );  
	//distanzaTotalePercorsa = 0.0; 
	array_distanzaIntersezioni = [];
 
}

function clearConsole1() {
	var textArea = document.getElementById("textArea");
	textArea.value = ""; 
}

function clearConsole2() {
	var textArea = document.getElementById("textAreaAHP");
	textArea.value = ""; 
}

function clearConsole3() {
	var textArea = document.getElementById("textAreaAlgoritmi");
	textArea.value = ""; 
}

function clearConsole4() {
	var textArea = document.getElementById("textAreaPercorso");
	textArea.value = ""; 
}


function cambiaMappaDiBase( ) {
	
	for( var i=1; i<5; i++ ) {
		if( document.getElementById("mappaDiBase0" + i ).checked == true ) {
			//mappa.eachLayer(function (layer) {
				//mappa.removeLayer(layer);
			//});
			mappa.removeLayer( mappaDiBase ); 
			switch( i ) {
				case 1: 
					mappaDiBase = L.tileLayer( "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" ); 
					break; 
				case 2: 
					mappaDiBase = L.tileLayer( "https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png" ); 
					window.open( 'https://www.cyclosm.org/legend.html','CycleOSM','scrollbars=yes,width=650,height=500'  ).focus(); 
					break;
				case 3: 
					mappaDiBase = L.tileLayer( "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}" ); 
					break; 
				case 4: 
					mappaDiBase = L.tileLayer( "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" ); 
					break;  
			}
			//mappaDiBase.addTo( mappa ); 
			mappa.addLayer( mappaDiBase ); 
		
		}
	}
}

function rimuoviMarkerSullaMappa( ) {
	
	rimuoviCostoMinimoAlgoritmi( true, false );
	
	inMappa( array_markerClienti, "invisible" ); 
	array_markerClienti = []; 
	inMappa( array_markerPOI, "invisible" ); 
	array_markerPOI = [];
	//
	array_markerPOISelezionati = []; 
	
	var select_risultatiMarkerClienteAHP = document.getElementById( "select_risultatiMarkerClienteAHP" );
	var lengthOptionsSelectRisultatiMarkerClienteAHP = select_risultatiMarkerClienteAHP.options.length; //lunghezza originaria
	for( var i = (lengthOptionsSelectRisultatiMarkerClienteAHP -1); i > 0; i-- ) { //Escludo la prima combinazione //Riposizionamento elementi
		select_risultatiMarkerClienteAHP.removeChild( select_risultatiMarkerClienteAHP.options[ i ] ); 
	}
	
}

function calcolaMatriciDiCosti() {
	
	var riga; 
	var colonna; 
	
	if( array_markerClienti.length == 0 ) {
		print1( "The number of Customer Markers identified on the map is equal to 0; operation terminated."); 
		return; 
	}
	
	if( array_markerPOI.length == 0 ) {
		print1( "The number of POI Markers identified on the map is equal to 0; operation terminated."); 
		return; 
	}
	
	array_distanzaClientiPOI = new Array( array_markerClienti.length ); 
	for( riga = 0; riga < array_markerClienti.length; riga++ ) {
		array_distanzaClientiPOI[ riga ] = new Array( array_markerPOI.length ); 
	}
	
	for( riga = 0; riga < array_markerClienti.length; riga++ ) {
		for( colonna = 0; colonna < array_markerPOI.length; colonna++ ) {
			array_distanzaClientiPOI[ riga ][ colonna ] = ottieniDistanza( array_markerPOI[ colonna ].getLatLng(), array_markerClienti[ riga ].getLatLng() ); 
		}
	}
	
	//
	
	array_costiAfferenza = new Array( array_markerClienti.length ); 
	for( riga = 0; riga < array_markerClienti.length; riga++ ) {
		array_costiAfferenza[ riga ] = new Array( array_markerPOI.length ); 
	}		
	
	for( riga = 0; riga < array_markerClienti.length; riga++ ) {
		for( colonna = 0; colonna < array_markerPOI.length; colonna++ ) {
			array_costiAfferenza[ riga ][ colonna ] = costoAfferenza( array_markerPOI[ colonna ], array_markerClienti[ riga ] ); 
		}
	}
	
	//
	
	array_costiAttivazioneManutenzione = new Array( array_markerPOI.length ); 
	for( colonna = 0; colonna < array_markerPOI.length; colonna++ ) { 
		array_costiAttivazioneManutenzione[ colonna ] = costoAttivazioneManutenzione( array_markerPOI[ colonna ] );
	}
	
}

function costoAfferenza( markerImpianto, markerCliente ) {
	var costo = ottieniDistanza( markerImpianto.getLatLng(), markerCliente.getLatLng() ) * euroSpesiPerChilometroAutoElettrica * numeroClientiPerComunita;
	return( parseFloat( costo.toFixed( 2 ) , 10 ) ); 
}

function costoAttivazioneManutenzione( markerImpianto ) {
	var costo = 0.0; 
	var numeratoreMediaAritmetica = ( 1.0 + densitaAbitativa/1000.0 ) + markerImpianto.options.fattoreImpianto + markerImpianto.options.fattorePendolarismo;
	var denominatoreMediaAritmetica = 3.0;
	if( markerImpianto.options.tipoMarker == "stazioniEsistentiPOI" ) { 
		var costo = (numeratoreMediaAritmetica / denominatoreMediaAritmetica) * costoAttivazioneManutenzioneImpianto1; 
	} else { 
		var costo = (numeratoreMediaAritmetica / denominatoreMediaAritmetica) * costoAttivazioneManutenzioneImpianto2; 
	}
	return( parseFloat( costo.toFixed( 2 ) , 10 ) ); 
}


function rimuoviCostoMinimoAlgoritmi( rimuoviTurfDistanzaMarkerClienti, valoreOpzioneGreedy ) {
	
	stato_selezionaRipristinaMarkerPOISiaAttiviSiaStazioniEsistenti = false; 
	inMappa( array_markerPOI, "visible" );  
	
	for( var i = 0; i < array_markerPOI.length; i++ ) { 
		
		inMappa( [ array_markerPOI[ i ].options.turfDistanza.geoJSON ], "invisible" ); 
		array_markerPOI[ i ].options.turfDistanza =
			new Turf( 
				turf.circle( [ array_markerPOI[ i ].options.coordinate[ 1 ], array_markerPOI[ i ].options.coordinate[ 0 ] ] , 0.2, {steps: 250, units: 'kilometers' } ) ,  "green" 
			);   
		
	}
	
	if( rimuoviTurfDistanzaMarkerClienti == true ) {
		for( var i = 0; i < array_markerClienti.length; i++ ) {
				
			inMappa( [ array_markerClienti[ i ].options.turfDistanza.geoJSON ], "invisible" ); 
			array_markerClienti[ i ].options.turfDistanza =
				new Turf( 
					turf.circle( [ array_markerClienti[ i ].options.coordinate[ 1 ], array_markerClienti[ i ].options.coordinate[ 0 ] ] , 0.0, {steps: 250, units: 'kilometers' } ) ,  "red" 
				); ////   
			
		}
		document.getElementById( "variazioneTurfDistanzaMarkerClienti" ).value = "0.000";
		document.getElementById( "range_variazioneTurfDistanzaMarkerClienti" ).value = "0";
	}
	
	//numeroDiCombinazioniMassimo = 0; 
	costoMinimoPerPOI = Number.POSITIVE_INFINITY; 
	array_costoMinimoPerPOI = []; 
	inMappa( array_collegamentiCostoMinimoPerPOI, "invisible" ); 
	array_collegamentiCostoMinimoPerPOI = []; 
	inMappa( array_collegamentiTemporanei, "invisible" ); 
	array_collegamentiTemporanei = [];
	document.getElementById("progressBarCombinazioni").value = "0";
	document.getElementById("avanzamento").value = "";
	//array_markerPOISelezionati = [];  
	array_markerPOIAttivi = []; 
	array_markerPOINONAttiviEsistenti = [];
	
	opzioneGreedy = valoreOpzioneGreedy; 
	
	array_datiAHP = [];
	var select_risultatiMarkerClienteAHP = document.getElementById( "select_risultatiMarkerClienteAHP" );
	select_risultatiMarkerClienteAHP.value = -1;
	//ripristinaMatriceAHP();
	//clearConsole2();
	//for( var i = 1; i < select_risultatiMarkerClienteAHP.options.length; i++ ) { //Escludo la prima combinazione
		//select_risultatiMarkerClienteAHP.removeChild( select_risultatiMarkerClienteAHP.options[ i ] ); 
	//}
	
	//clearConsole3();
	
}

async function loadFile( file )  {
	/*
	var file = document.getElementById("file input").files[0];
	var reader = new FileReader();
	console.log( file ); 
	content = reader.readAsBinaryString(file );
	console.log(content);
	*/
	
	var text = await file.text();
	
	elaboraFlussiPendolarismo( text ); 
}

function ripristinoFattorePendolarismo() {
	for( var i = 0; i < array_markerPOI.length; i++ ) {
		array_markerPOI[i].options.fattorePendolarismo = 1;  
		array_markerPOI[i].options.sommatoriaFlussi = 0;  
		aggiornaPopupSingoloMarker( array_markerPOI[i] ); 
	}
	inMappa( array_collegamentiFlussi, "invisible" ); 
	array_collegamentiFlussi = [];
	
}

function variazioneTurfDistanzaMarkerClienti() {
	
	var turfDistanza = document.getElementById("range_variazioneTurfDistanzaMarkerClienti").value / 1000.0; 
	document.getElementById("variazioneTurfDistanzaMarkerClienti").value = turfDistanza.toFixed( 3 );  
	
	//Marker Clienti 
	for( var riga = 0; riga < array_markerClienti.length; riga++ ) { 
		inMappa( [ array_markerClienti[ riga ].options.turfDistanza.geoJSON ], "invisible" ); 
		array_markerClienti[ riga ].options.turfDistanza = 
			new Turf( 
				turf.circle( [ array_markerClienti[ riga ].options.coordinate[ 1 ], array_markerClienti[ riga ].options.coordinate[ 0 ] ] , turfDistanza, {steps: 250, units: 'kilometers' } ) ,
				"red"
			 );
		  	
		if( turfDistanza == 0.0 ) {	
			inMappa( [ array_markerClienti[ riga ].options.turfDistanza.geoJSON ], "invisible" ); 
		} else if( turfDistanza > 0.0 ) {
			inMappa( [ array_markerClienti[ riga ].options.turfDistanza.geoJSON ], "visible" ); 
		}
	}
	
}

function variazioneTurfDistanzaMarkerPOI() {
	
	var turfDistanza = document.getElementById("range_variazioneTurfDistanzaMarkerPOI").value / 1000.0; 
	document.getElementById("variazioneTurfDistanzaMarkerPOI").value = turfDistanza.toFixed( 3 );  
	
	//MarkerPOI attivi
	for( var indiceColonna = 0; indiceColonna < array_markerPOIAttivi.length; indiceColonna++ ) {
		var numMarkerPOI = array_markerPOIAttivi[ indiceColonna ]; 
		inMappa( [ array_markerPOI[ numMarkerPOI ].options.turfDistanza.geoJSON ], "invisible" ); 
		array_markerPOI[ numMarkerPOI ].options.turfDistanza = 
			new Turf( 
				turf.circle( [ array_markerPOI[ numMarkerPOI ].options.coordinate[ 1 ], array_markerPOI[ numMarkerPOI ].options.coordinate[ 0 ] ] , turfDistanza, {steps: 250, units: 'kilometers' } ) ,
				"green"
			 );  	
			
		inMappa( [ array_markerPOI[ numMarkerPOI ].options.turfDistanza.geoJSON ], "visible" ); 
	}
	
	//MarkerPOI NON attivi ed esistenti
	for( var indiceColonna = 0; indiceColonna < array_markerPOINONAttiviEsistenti.length; indiceColonna++ ) {
		var numMarkerPOI = array_markerPOINONAttiviEsistenti[ indiceColonna ]; 
		inMappa( [ array_markerPOI[ numMarkerPOI ].options.turfDistanza.geoJSON ], "invisible" ); 
		array_markerPOI[ numMarkerPOI ].options.turfDistanza = 
			new Turf( 
				turf.circle( [ array_markerPOI[ numMarkerPOI ].options.coordinate[ 1 ], array_markerPOI[ numMarkerPOI ].options.coordinate[ 0 ] ] , turfDistanza, {steps: 250, units: 'kilometers' } ) ,
				"orange"
			 );  	
			
		inMappa( [ array_markerPOI[ numMarkerPOI ].options.turfDistanza.geoJSON ], "visible" ); 
	}
	
}

function variazioneTurfIntersezioni() {
	
	array_distanzaIntersezioni = [];  
	
	//Marker POI attivi 
	for( var indiceColonna = 0; indiceColonna < array_markerPOIAttivi.length; indiceColonna++ ) {
		var numMarkerPOI = array_markerPOIAttivi[ indiceColonna ]; 
		
		if( lineString_trovaPercorsoSullaMappa.turf != null ) {
			var intersezione = turf.lineIntersect( lineString_trovaPercorsoSullaMappa.turf , array_markerPOI[ numMarkerPOI ].options.turfDistanza.turf );
			//print4( intersezione.features ); 
			if( intersezione.features.length > 0 ) {
				array_distanzaIntersezioni.push( array_markerPOI[ numMarkerPOI ].options.numeroMarkerInserimento ); 
			}
		}
		
	}
	
	//Marker POI NON attivi ed esistenti
	for( var indiceColonna = 0; indiceColonna < array_markerPOINONAttiviEsistenti.length; indiceColonna++ ) {
		var numMarkerPOI = array_markerPOINONAttiviEsistenti[ indiceColonna ]; 
		
		if( lineString_trovaPercorsoSullaMappa.turf != null ) {
			var intersezione = turf.lineIntersect( lineString_trovaPercorsoSullaMappa.turf , array_markerPOI[ numMarkerPOI ].options.turfDistanza.turf );
			//print4( intersezione.features ); 
			if( intersezione.features.length > 0 ) {
				array_distanzaIntersezioni.push( array_markerPOI[ numMarkerPOI ].options.numeroMarkerInserimento ); 
			}
		}
		
	}
	
	
	if( lineString_trovaPercorsoSullaMappa.turf == null ) {
		//print4("Nessun percorso individuato in mappa. "); 
	} else if( lineString_trovaPercorsoSullaMappa.turf != null  && array_distanzaIntersezioni.length == 0 ) {
		print4("No electric charging stations identified along the route."); 
	} else if( lineString_trovaPercorsoSullaMappa.turf != null  && array_distanzaIntersezioni.length > 0 ) {
		print4("Electric charging stations identified [MarkerNumber]: " + array_distanzaIntersezioni );  
	}
	
}

function ricercaCollegamentiConCostoMinimoPOIAttivi() {
	
	var array_rigaCostiAfferenzaClientiPOIAttivi = []; 
	var sommaCostiAfferenzaClientiPOIAttiviSelezioneCostoAfferenza = 0;
	var minimoRiga = null; 		
		
	//Costi Afferenza
	for( var riga = 0; riga < array_markerClienti.length; riga++ ) {
		array_rigaCostiAfferenzaClientiPOIAttivi = [];
		for( var indiceColonna = 0; indiceColonna < array_markerPOIAttivi.length; indiceColonna++ ) { 
				array_rigaCostiAfferenzaClientiPOIAttivi.push( array_costiAfferenza[ riga ][ array_markerPOIAttivi[ indiceColonna] ] ); 				
		}
		
		minimoRiga = Math.min( ...array_rigaCostiAfferenzaClientiPOIAttivi ); 
		sommaCostiAfferenzaClientiPOIAttiviSelezioneCostoAfferenza = sommaCostiAfferenzaClientiPOIAttiviSelezioneCostoAfferenza + minimoRiga; 
		array_costoMinimoPerPOI.push( array_costiAfferenza[ riga ].indexOf( minimoRiga ) ); 
		
	}
	
	var array_markerPOIAttiviSelezioneCostoAfferenza = Array.from(new Set( array_costoMinimoPerPOI ) ); 
	
	//Costi attivazione e manutenzione
	for( var indiceColonna = 0; indiceColonna < array_markerPOIAttiviSelezioneCostoAfferenza.length; indiceColonna++ ) {
		sommaCostiAfferenzaClientiPOIAttiviSelezioneCostoAfferenza = sommaCostiAfferenzaClientiPOIAttiviSelezioneCostoAfferenza + array_costiAttivazioneManutenzione[ array_markerPOIAttiviSelezioneCostoAfferenza[ indiceColonna ] ]; 
	}
		
	costoMinimoPerPOI = sommaCostiAfferenzaClientiPOIAttiviSelezioneCostoAfferenza; 
	
}

function collegamentiInMappaMarkerPOIClienti() {
	
	inMappa( array_collegamentiTemporanei, "invisible" ); 
	array_collegamentiTemporanei = []; 
	
	inMappa( array_collegamentiCostoMinimoPerPOI, "invisible" ); 
	array_collegamentiCostoMinimoPerPOI = []; 
	
	for( var i = 0; i < array_markerPOI.length; i++ ) {
		inMappa( [ array_markerPOI[ i ].options.turfDistanza.geoJSON ], "invisible" ); 
		array_markerPOI[ i ].options.turfDistanza =
			new Turf( 
				turf.circle( [ array_markerPOI[ i ].options.coordinate[ 1 ], array_markerPOI[ i ].options.coordinate[ 0 ] ] , 0.2, {steps: 250, units: 'kilometers' } ) ,  "green" 
			);
	}
	
	for( var i = 0; i < array_costoMinimoPerPOI.length; i++ ) {
		if( array_costoMinimoPerPOI[ i ] == "Not_defined" ) { //Non_definito
			//Metodologia AHP
		} else {
			array_collegamentiCostoMinimoPerPOI.push( ottieniPolilinea( [ array_markerPOI[ array_costoMinimoPerPOI[ i ] ].getLatLng(), array_markerClienti[ i ].getLatLng() ] , "green" ) );
			inMappa( [ array_markerPOI[ array_costoMinimoPerPOI[ i ] ].options.turfDistanza.geoJSON ] , "visible" ); //Distanza Marker POI
		
		}
		 
	}
	
	for( var i = 0; i < array_markerPOI.length; i++ ) {
		if( array_markerPOI[ i ].options.tipoMarker == "stazioniEsistentiPOI" && array_markerPOIAttivi.indexOf( i ) < 0 ) {
			array_markerPOINONAttiviEsistenti.push( array_markerPOI[ i ].options.numeroMarkerInserimento );
			array_markerPOI[ i ].options.turfDistanza = 
				new Turf( 
					turf.circle( [ array_markerPOI[ i ].options.coordinate[ 1 ], array_markerPOI[ i ].options.coordinate[ 0 ] ] , 0.2, {steps: 250, units: 'kilometers' } ) ,
					"orange"
				); 
			 
			inMappa( [ array_markerPOI[ i ].options.turfDistanza.geoJSON ] , "visible" ); 
		}
	}

	inMappa( array_collegamentiCostoMinimoPerPOI, "visible" ); 
	
}

function gestioneSchede( scheda ) {
	
	var schedaInput = document.getElementById( "schedaInput" ); 
	var schedaColonnine = document.getElementById( "schedaColonnine" ); 
	var schedaPercorso = document.getElementById( "schedaPercorso" ); 
	
	if( scheda == "schedaInput" ) {
		schedaInput.style.display = "block"; 
		schedaInput.style.visibility = "visible";
		schedaColonnine.style.display = "none"; 
		schedaColonnine.style.visibility = "hidden"; 
		schedaPercorso.style.display = "none"; 
		schedaPercorso.style.visibility = "hidden"; 
		
	} else if( scheda == "schedaColonnine" ) {
		schedaInput.style.display = "none"; 
		schedaInput.style.visibility = "hidden";
		schedaColonnine.style.display = "block"; 
		schedaColonnine.style.visibility = "visible"; 
		schedaPercorso.style.display = "none"; 
		schedaPercorso.style.visibility = "hidden"; 
		
	} else if( scheda == "schedaPercorso" ) {
		schedaInput.style.display = "none"; 
		schedaInput.style.visibility = "hidden";
		schedaColonnine.style.display = "none"; 
		schedaColonnine.style.visibility = "hidden"; 
		schedaPercorso.style.display = "block"; 
		schedaPercorso.style.visibility = "visible"; 
	}
	
}

function aggiornaPopupSingoloMarker( marker ) {
	//marker.getPopup().getContent() 
	
	var exprMarkerType = ""; 
	/*************************************************************************************/
	if( marker.options.tipoMarker == "clienti" ) {
		exprMarkerType = "MarkerType: " + "customers" + "<br>";
	} else if( marker.options.tipoMarker == "mercatiPOI" ) {
		exprMarkerType = "MarkerType: " + "marketsPOI" + "<br>";
	} else if( marker.options.tipoMarker == "stazioniEsistentiPOI" ) {
		exprMarkerType = "MarkerType: " + "existingChargingStationsPOI" + "<br>";
	} else if( marker.options.tipoMarker == "parcheggiPOI" ) {
		exprMarkerType = "MarkerType: " + "parkingAreasPOI" + "<br>";
	} else { //Non previsto
		exprMarkerType = "MarkerType: " + "" + "<br>";
	}  
	/*************************************************************************************/
		
	marker.getPopup().setContent( "" + 
		"InsertionNumberMarker: " + marker.options.numeroMarkerInserimento + "<br>" +
		"Coordinates: " + marker.options.coordinate + "<br>" + 
		"Amenity: " + marker.options.amenity + "<br>" + 
		"Name: " + marker.options.nome + "<br>" + 
		//"MarkerType: " + marker.options.tipoMarker + "<br>" +  
		exprMarkerType + 
		"ImplantFactor: " + marker.options.fattoreImpianto + "<br>" + 
		"FlowSum_(NumberOfPeople): " + marker.options.sommatoriaFlussi + "<br>" + 
		"CommutingFactor: " + marker.options.fattorePendolarismo 
	); 
} 

function aggiornaOptionsSingoloMarker( marker ) {

	if ( marker.options.tipoMarker == "mercatiPOI" ) {
		marker.options.fattoreImpianto = fattoreImpiantoMercatiPOI;  
	} else if ( marker.options.tipoMarker == "stazioniEsistentiPOI" ) { 
		marker.options.fattoreImpianto = fattoreImpiantostazioniEsistentiPOI;  
	} else if ( marker.options.tipoMarker == "parcheggiPOI" ) {
		marker.options.fattoreImpianto = fattoreImpiantoParcheggiPOI;  
	}
}

function aggiornaArrayMarkerPOI() {
	for( var i = 0; i < array_markerPOI.length; i++ ) {
		aggiornaOptionsSingoloMarker( array_markerPOI[i] ); 
		aggiornaPopupSingoloMarker( array_markerPOI[i] ); 
	}
}

function ottieniMarker( array_latLng, tipoMarker, coloreMarker ) {
	
	var tipoIcona = null; 
	
	if( tipoMarker == "clienti" ) {
		tipoIcona = new L.Icon({ iconUrl: './icon/customer.png', iconSize: [ 30, 30 ], iconAnchor: [ 15, 30 ], popupAnchor: [ 0 , -30 ] }); 
	} else if(  tipoMarker == "mercatiPOI" ) {
		tipoIcona = new L.Icon({ iconUrl: './icon/store.png', iconSize: [ 30, 30 ], iconAnchor: [ 15, 30 ], popupAnchor: [ 0 , -30 ] })
	} else if( tipoMarker == "stazioniEsistentiPOI" ) {
		tipoIcona = new L.Icon({ iconUrl: './icon/charging-station.png', iconSize: [ 30, 30 ], iconAnchor: [ 15, 30 ], popupAnchor: [ 0 , -30 ] })
	} else if( tipoMarker == "parcheggiPOI" ) {
		tipoIcona = new L.Icon({ iconUrl: './icon/parking.png', iconSize: [ 30, 30 ], iconAnchor: [ 15, 30 ], popupAnchor: [ 0 , -30 ] })
	} else {
		tipoIcona = L.AwesomeMarkers.icon({ 
			//icon: 'home', 
			markerColor: coloreMarker
		}); 
	};
	return new markerPersonalizzato( array_latLng , {icon: tipoIcona })
		.bindPopup( "" , { 'maxWidth': '330', 'className' : 'custom' })
		.on( 	'mouseover' , function( e ) {
					this.openPopup(); 
			} 
		)
		.on( 	'mouseout' , function( e ) {
					this.closePopup(); 
			} 
		); 
	
}

function inMappa( array, presence ) {
	for( var i = 0; i<array.length; i++ ) {
		if( presence == "visible" ) { 
			if( array[i] != null ) {
				mappa.addLayer( array[i] ); 
			}
		} else if( presence == "invisible" ) {
			if( array[i] != null ) {
				mappa.removeLayer( array[i] ); 
			}
		} 
	}
	
}


function print1( testoConsole ) {
	var textArea = document.getElementById("textArea");
	var separatore = ""; 
	if( textArea.value != "" ) {
			separatore = "\n::::::::::\n"; 
	}
	textArea.value = textArea.value + separatore + testoConsole;  
	//textArea.focus(); 
	textArea.scrollTop = textArea.scrollHeight;
}

function print2( testoConsole ) {
	var textAreaAHP = document.getElementById("textAreaAHP");
	var separatore = ""; 
	if( textAreaAHP.value != "" ) {
			separatore = "\n::::::::::\n"; 
	}
	textAreaAHP.value = textAreaAHP.value + separatore + testoConsole;  
	//textArea.focus(); 
	textAreaAHP.scrollTop = textAreaAHP.scrollHeight;
}

function print3( testoConsole ) {
	var textAreaAlgoritmi = document.getElementById("textAreaAlgoritmi");
	var separatore = ""; 
	if( textAreaAlgoritmi.value != "" ) {
			separatore = "\n::::::::::\n"; 
	}
	textAreaAlgoritmi.value = textAreaAlgoritmi.value + separatore + testoConsole;  
	//textArea.focus(); 
	textAreaAlgoritmi.scrollTop = textAreaAlgoritmi.scrollHeight;
}

function print4( testoConsole ) {
	var textAreaPercorso = document.getElementById("textAreaPercorso");
	var separatore = ""; 
	if( textAreaPercorso.value != "" ) {
			separatore = "\n::::::::::\n"; 
	}
	textAreaPercorso.value = textAreaPercorso.value + separatore + testoConsole;  
	//textArea.focus(); 
	textAreaPercorso.scrollTop = textAreaPercorso.scrollHeight;
}

function sprintf( testo ) {
	return ("" + testo).padEnd( 22, ' '); 
}

function printVettoreColonna( array ) {
	var ris = ""; 
	for( var pos = 0; pos < array.length; pos++ ) {
		ris = ris + ( Number.isInteger( array[ pos ] ) ? array[ pos ] : array[ pos ].toFixed(6) ) + "\n"; 
	}
	return ris; 
}

function printMatrice2D( array ) {
	var ris = ""; 
	for( var righe = 0; righe < array.length; righe++ ) {
		for( var colonne = 0; colonne < array[0].length; colonne++ ) {
			ris = ris + ("" + ( Number.isInteger( array[ righe ][ colonne ] ) ? array[ righe ][ colonne ] : array[ righe ][ colonne ].toFixed(6) ) ).padEnd( 22, ' '); 
		} 
		ris = ris + "\n"; 
	}
	return ris; 
}

function ottieniDistanza( array_latLng1, array_latLng2 ) { //argomenti L.latLng
	if( tipoDistanza == "Euclidea" ) {
		return parseFloat( ( array_latLng1.distanceTo( array_latLng2 ) / 1000.0 ).toFixed( 6 ), 10); //in chilometri 
	
	} else if( tipoDistanza == "Manhattan" ) {
		var lng1 = array_latLng1.lng; 
		var lat1 = array_latLng1.lat; 
		var lng2 = array_latLng2.lng; 
		var lat2 = array_latLng2.lat; 
		var distanzaInMetri = L.latLng( lat1, lng1 ).distanceTo( L.latLng( lat1, lng2 ) ) + L.latLng( lat1, lng2 ).distanceTo( L.latLng( lat2, lng2 ) ); 
		return parseFloat( ( distanzaInMetri / 1000.0 ).toFixed( 6 ) , 10 ); //in chilometri
	}
}

function ottieniPolilinea( array_latLng, colorePolilinea ) {
	return new L.Polyline( array_latLng, { color: colorePolilinea, weight: 3, opacity: 1, smoothFactor: 1 } );
}

function incrementaArrayGreedy(  arrayDiCombinazioni, numeroMassimoPOI, iterazioneGreedy, numeroDiCombinazioniMassimoGreedy ) {
	
	//var ultimoCliente = arrayDiCombinazioni.length - 1; 
	var ultimoPOI = numeroMassimoPOI - 1; 
	
	//var riga = ultimoCliente; 
	var ripeti = true;
	
	print3( "\tMaximum number of combinations (Greedy algorithm): " + numeroDiCombinazioniMassimoGreedy); 

	while( ripeti == true  ) {
		
		if( iterazioneGreedy > 0 ) {
			var contatoreZeri = 0; 
			for( var i = 0; i < arrayDiCombinazioni.length; i++ ) {
				if( arrayDiCombinazioni[ i ] == 0 ) { 
					contatoreZeri = contatoreZeri + 1; 	
				}
			}
			
			if( contatoreZeri == arrayDiCombinazioni.length ) {
				return iterazioneGreedy;
			}
		} 
		
		incrementaArray( arrayDiCombinazioni, numeroMassimoPOI); 
		if( iterazioneGreedy < ( numeroDiCombinazioniMassimoGreedy - 1 ) ) {
			iterazioneGreedy = iterazioneGreedy + 1;
		}
		print3("\tGreedy counter increment: \n" + 
			"\t- combination [internal MarkerNumber]: " + arrayDiCombinazioni + "\n" +
			"\t- iteration:  " + iterazioneGreedy 
		);
		
		for( var pos = 0; pos < ultimoPOI; pos++ ) {
			
			if( arrayDiCombinazioni.includes( pos ) == false ) {
				ripeti = true; 
				
				break; 
			} else if( arrayDiCombinazioni.includes( pos ) == true ) {
				ripeti = false; 	
				
			}
		}
		
	}
	return iterazioneGreedy;	
		
}

function incrementaArray( arrayDiCombinazioni, numeroMassimoPOI ) {
	
	if( arrayDiCombinazioni.length == 0 ) {
		print3("ArrayOfCombinations not initialized. Operation terminated.");
		return; 
	}
	
	var ultimoCliente = arrayDiCombinazioni.length - 1; 
	var ultimoPOI = numeroMassimoPOI - 1; 
	
	var riga = ultimoCliente; 
	var ripeti = true; 
	
	while( ripeti && riga >= 0 ) {
		if( arrayDiCombinazioni[ riga ] < ultimoPOI ) {
			arrayDiCombinazioni[ riga ] = arrayDiCombinazioni[ riga ] + 1; 
			ripeti = false;
		} else if(  arrayDiCombinazioni[ riga ] == ultimoPOI ) {
			 arrayDiCombinazioni[ riga ] = 0; 
			 riga--; 
			 ripeti = true; 
		}
		
	}

}

function ripristinaMatriceAHP() {
	
	for( var riga = 0; riga < array_punteggioAHP.length; riga++ ) {	
		for( var colonna = 0; colonna < array_punteggioAHP[ riga ].length; colonna++ ) {
			array_punteggioAHP[ riga ][ colonna ] = 1.0; 
			document.getElementById( "punteggioAHP" + riga + colonna ).value = "1"; 
		}
	}
	
	criteriPV = []; 
	
}

function ordinaArray( array ) {
	return array.sort( function( a, b ) {
		return( a - b ); 	
	}); 
}

function prodottoMatrici( array1, array2 ) {
	
	if( array1[0].length != array2.length ) {
		print3( "Product between matrices not allowed; operation terminated." );
		return; 
	}
	
	var sommatoria = 0; 
	
	var array3 = new Array( array1.length ); 
	//for( var riga1 = 0; riga1 < array1.length; riga1++ ) { 
		//array3[ riga1 ] = new Array( array2[0].length ); 
	//}
	
	for( var riga1 = 0; riga1 < array1.length; riga1++ ) {
		for( var colonna2 = 0; colonna2 < 1; colonna2++ ) { //array2[0].length
			sommatoria = 0; 
			for( var posizione = 0; posizione < array1[0].length; posizione++ ) {
				sommatoria = sommatoria + array1[ riga1 ][ posizione ] * array2[ posizione ]; //array2[ posizione ][ colonna2 ]
			}
			//array3[ riga1 ][ colonna2 ] = sommatoria;
			array3[ riga1 ] = sommatoria; 
		}
	}	
	
	/*
	for( var riga = 0; riga < array3.length; riga++ ) {
		print3( array3[ riga ] ); 	
	} 
	*/
	
	return array3; 
	
}

function selezionaRipristinaMarkerPOISiaAttiviSiaStazioniEsistenti() {
	 
	if( array_markerPOIAttivi.length > 0 ) { // && array_markerPOINONAttiviEsistenti.length > 0 ) {
		stato_selezionaRipristinaMarkerPOISiaAttiviSiaStazioniEsistenti = !stato_selezionaRipristinaMarkerPOISiaAttiviSiaStazioniEsistenti; 
		
		if( stato_selezionaRipristinaMarkerPOISiaAttiviSiaStazioniEsistenti == true ) {
			for( var i = 0; i < array_markerPOI.length; i++ ) {
				if( 
					array_markerPOIAttivi.indexOf( array_markerPOI[ i ].options.numeroMarkerInserimento ) >= 0 || 
					array_markerPOINONAttiviEsistenti.indexOf( array_markerPOI[ i ].options.numeroMarkerInserimento ) >= 0  	
				) {
					//
				} else {
					inMappa( [ array_markerPOI[i] ], "invisible" ); 	
				}
			}
		} else if( stato_selezionaRipristinaMarkerPOISiaAttiviSiaStazioniEsistenti == false ) {
					inMappa( array_markerPOI, "visible" ); 
		}
		
	} else {
		print3( "No solution identified on map; operation terminated." ); 
	}
	
}

function attendi(ms)
{
    return(
        new Promise(function(resolve, reject)
        {
            var st = setTimeout(function() { 
				resolve("Operation terminated"); clearTimeout( st ); //return;
			 }, ms);
        })
    );
}

function haElementi( array ) {
	var controllo = true; 
	var i = 0; 
	while( i < array.length && controllo == true ) {
		if( mappa.hasLayer( array[i] ) ) {
			controllo = true; 
		} else {
			controllo = false; 
		}
		i++;
	}
	return controllo; 
}




