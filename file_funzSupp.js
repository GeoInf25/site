
var schedaPython = null;
var schedaCSharp = null;
var schedaJavascript = null;
var schedaJava = null;
var schedaDatabase = null;
var schedaGIS = null;
var schedaDisegni3D = null;
var schedaAltriLinks = null;

var schede = null; 

var schedaDabaseCliccata = null; 

function gestioneSchede( scheda ) {

	//console.log( "" + scheda )

	for( var i = 0; i < schede.length; i++ ) {
		var tempNomeScheda = schede[ i ].id; 
		if( tempNomeScheda == ( "" + scheda ) ) { //vedi nome schede
			schede[ i ].style.display = "block"; 
			schede[ i ].style.visibility = "visible";
		} else {
			schede[ i ].style.display = "none"; 
			schede[ i ].style.visibility = "hidden";
		}
	}
	
	if( scheda == "schedaDatabase" ) {
		schedaDabaseCliccata = true; 
		//console.log( "lato JS " + schedaDabaseCliccata )
	} else {
		schedaDabaseCliccata = false; 
	}
	

}



