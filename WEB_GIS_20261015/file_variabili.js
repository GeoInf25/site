
//Mappa 
var mappa; 

//Mappa di Base 
var mappaDiBase; 

//Overlay Layer
//L.layerGroup();

//lat, lng, zoom
var latitudine = 45.82; 
var longitudine = 10.88; 
var zoom = 10; 

//Flussi pendolarismo
var array_flussi = []; 
var array_collegamentiFlussi = []; 

//Limiti mappa
var latNE = null; 
var lngNE = null; 
var latSW = null; 
var lngSW = null; 

//Stato dei comandi  
var stato_calcolaDistanzaSullaMappa = false; 
var stato_calcolaAreaSullaMappa = false;
var stato_trovaPercorsoSullaMappa = false; 
var stato_calcoloCostoMinimo = false;
var stato_selezionaRipristinaMarkerPOISiaAttiviSiaStazioniEsistenti = false;

//Termina operazione
terminaOperazione = false; 

/*
Esempio:
area[ name="Veneto" ];
node [place~"city|town|hamlet|village"][name="Adria"](area);
out;
*/

//Classe
class Turf {
 	constructor( turfObject, turfColor) {
		if( turfObject == null && turfColor == null ) { 
			this.turf = null;
			this.geoJSON = null; 
		} else {
	    	this.turf = turfObject;
			this.geoJSON = 
				new L.geoJSON ( 
					turfObject , {
						style: function(feature) { return { color: turfColor, fillOpacity: 0.1 }; }
				});;
		}
	}
}

//Marker personalizzato
markerPersonalizzato = L.Marker.extend({
	options: { //"options" obbligatorio!
		coordinate: "", 
		amenity: "", 
		nome: "",
		tipoMarker: "",		
		numeroMarkerInserimento: "",
		fattoreImpianto: "Non specificato", 
		sommatoriaFlussi: "Non specificato",
		fattorePendolarismo: "Non specificato", 
		turfDistanza: new Turf( null, null )
	}
	
});

//Variabili
var areaInMappa = 0.0; 
var densitaAbitativa = 0.0;
var numeroClientiPerComunita = 3500.0; 
var euroSpesiPerChilometroAutoElettrica = 0.5;  
var costoAttivazioneManutenzioneImpianto1 = 120.0; 
var costoAttivazioneManutenzioneImpianto2 = 1200.0; 
var tipoDistanza = "Euclidea"; //Euclidea, Manhattan 

//FattoreImpianto 
var fattoreImpiantoClienti = "Not expected" //"Non previsto"; 
var fattoreImpiantoMercatiPOI= 0.4; 
var fattoreImpiantostazioniEsistentiPOI = 1.0; 
var fattoreImpiantoParcheggiPOI = 0.5; 
var fattorePendolarismo = 1.0; 
var sommatoriaFlussi = 0.0; 

//AHP
var array_punteggioAHP = [ [ 1.0, 1.0, 1.0, 1.0 ], [ 1.0 , 1.0, 1.0, 1.0 ], [ 1.0, 1.0, 1.0, 1.0 ], [ 1.0, 1.0, 1.0, 1.0 ] ]; 
var CR = undefined;   
var tipologiaMediaMatriceAHP = "aritmetica"; //aritmetica, geometrica
var criteriPV = [ ]; 
var distPV = [ ];
var cAttPV = [ ]; 
var cTotPV = [ ]; 
var fattImpPV = [ ];  
var array_datiAHP = [ ];  

//Marker sulla mappa
var array_markerClienti = []; 
var array_markerPOI = [];
//var array_markerPOISelezionati = [];  

//Combinazioni e costo minimo
var array_costiAfferenza = []; 
var array_costiAttivazioneManutenzione = []; 
var array_distanzaClientiPOI = []; 
var opzioneGreedy = false;
var varianteGreedy = "" //combinazioneMarker, markerAttivi

//var numeroDiCombinazioniMassimo = 0; 
var costoMinimoPerPOI = Number.POSITIVE_INFINITY; 
var array_markerPOIAttivi = [];
var array_markerPOINONAttiviEsistenti = [];
var array_costoMinimoPerPOI = []; 
var array_collegamentiCostoMinimoPerPOI = []; 
var array_collegamentiTemporanei = []; 

//Calcola distanza sulla mappa
var array_calcolaDistanzaSullaMappa = []; 
var polilineaTemp_calcolaDistanzaSullaMappa = ottieniPolilinea( [ ], "" )
var polilinea_calcolaDistanzaSullaMappa = ottieniPolilinea( [ ], "" );
var distanzaSullaMappa = 0; 

//Calcola area sulla mappa
var array_calcolaAreaSullaMappa = []; 
var areaTemp_calcolaAreaSullaMappa = new Turf( null, null); 
var area_calcolaAreaSullaMappa = new Turf( null, null);
var areaSullaMappa = 0; 

//Trova percorso sulla mappa
var array_inizioFinePercorso = []; 
var array_puntiDelPercorso = []; 
var array_markerAllaRicarica = [];
var livelloCarica = 20; 
var autonomiaMacchina = 100.0;
var autonomiaPrevista = 20.0;
var profileOSRM = "car";
var lineString_trovaPercorsoSullaMappa = new Turf( null, null);  
var distanzaTotalePercorsa = 0.0; 
var array_distanzaIntersezioni = [];

//Mostra variabili
var testo_mostraVariabili = ""; 

