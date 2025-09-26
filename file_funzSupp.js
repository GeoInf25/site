
function gestioneSchede( scheda ) {
	
	var schedaPython = document.getElementById( "schedaPython" ); 
	var schedaCSharp = document.getElementById( "schedaCSharp" ); 
	var schedaJavascript = document.getElementById( "schedaJavascript" ); 
	var schedaDatabase = document.getElementById( "schedaDatabase" );
	var schedaDisegni3D = document.getElementById( "schedaDisegni3D" );
	var schedaOtherLinks = document.getElementById( "schedaAltriLinks" ); 

	var schede = [ 
		schedaPython, 
		schedaCSharp, 
		schedaJavascript,
		schedaDatabase,
		schedaDisegni3D,
		schedaOtherLinks
	]; 
	
	if( scheda == "Python" ) {
		console.log( schede[0].name );  
		schedaPython.style.display = "block"; 
		schedaPython.style.visibility = "visible";
		schedaCSharp.style.display = "none"; 
		schedaCSharp.style.visibility = "hidden"; 
		schedaJavascript.style.display = "none"; 
		schedaJavascript.style.visibility = "hidden"; 
		schedaDatabase.style.display = "none"; 
		schedaDatabase.style.visibility = "hidden"; 
		schedaOtherLinks.style.display = "none"; 
		schedaOtherLinks.style.visibility = "hidden"; 
		
	} else if( scheda == "CSharp" ) {
		schedaPython.style.display = "none"; 
		schedaPython.style.visibility = "hidden";
		schedaCSharp.style.display = "block"; 
		schedaCSharp.style.visibility = "visible"; 
		schedaJavascript.style.display = "none"; 
		schedaJavascript.style.visibility = "hidden"; 
		schedaDatabase.style.display = "none"; 
		schedaDatabase.style.visibility = "hidden"; 
		schedaOtherLinks.style.display = "none"; 
		schedaOtherLinks.style.visibility = "hidden"; 
		
	} else if( scheda == "Javascript" ) {
		schedaPython.style.display = "none"; 
		schedaPython.style.visibility = "hidden";
		schedaCSharp.style.display = "none"; 
		schedaCSharp.style.visibility = "hidden"; 
		schedaJavascript.style.display = "block"; 
		schedaJavascript.style.visibility = "visible";
		schedaDatabase.style.display = "none"; 
		schedaDatabase.style.visibility = "hidden";  
		schedaOtherLinks.style.display = "none"; 
		schedaOtherLinks.style.visibility = "hidden"; 

	} else if( scheda == "Database" ) {
		schedaPython.style.display = "none"; 
		schedaPython.style.visibility = "hidden";
		schedaCSharp.style.display = "none"; 
		schedaCSharp.style.visibility = "hidden"; 
		schedaJavascript.style.display = "none"; 
		schedaJavascript.style.visibility = "hidden"; 
		schedaDatabase.style.display = "block"; 
		schedaDatabase.style.visibility = "visible"; 
		schedaOtherLinks.style.display = "none"; 
		schedaOtherLinks.style.visibility = "hidden"; 

	} else if( scheda == "altriLinks" ) {
		schedaPython.style.display = "none"; 
		schedaPython.style.visibility = "hidden";
		schedaCSharp.style.display = "none"; 
		schedaCSharp.style.visibility = "hidden"; 
		schedaJavascript.style.display = "none"; 
		schedaJavascript.style.visibility = "hidden"; 
		schedaDatabase.style.display = "none"; 
		schedaDatabase.style.visibility = "hidden"; 
		schedaOtherLinks.style.display = "block"; 
		schedaOtherLinks.style.visibility = "visible"; 
	}
	

}



