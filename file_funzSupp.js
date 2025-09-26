
var schede = null; 

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



