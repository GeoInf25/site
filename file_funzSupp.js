
var schedaPython = document.getElementById( "schedaPython" );
var schedaCSharp = document.getElementById( "schedaCSharp" );
var schedaJavascript = document.getElementById( "schedaJavascript" );
var schedaDatabase = document.getElementById( "schedaDatabase" );
var schedaDisegni3D = document.getElementById( "schedaDisegni3D" );
var schedaAltriLinks = document.getElementById( "schedaAltriLinks" );

var schede = [ 
	schedaPython,
	schedaCSharp,
	schedaJavascript, 
	schedaDatabase,
	schedaDisegni3D,
	schedaAltriLinks
]; 

function gestioneSchede( scheda ) {

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

}



