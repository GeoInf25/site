
function gestioneSchede( scheda ) {
	
	var schedaPython = document.getElementById( "schedaPython" ); 
	var schedaCSharp = document.getElementById( "schedaCSharp" ); 
	var schedaJavascript = document.getElementById( "schedaJavascript" ); 
	var schedaMySQL = document.getElementById( "schedaMySQL" );
	var schedaOtherLinks = document.getElementById( "schedaAltriLinks" ); 
	
	if( scheda == "Python" ) {
		schedaPython.style.display = "block"; 
		schedaPython.style.visibility = "visible";
		schedaCSharp.style.display = "none"; 
		schedaCSharp.style.visibility = "hidden"; 
		schedaJavascript.style.display = "none"; 
		schedaJavascript.style.visibility = "hidden"; 
		schedaMySQL.style.display = "none"; 
		schedaMySQL.style.visibility = "hidden"; 
		schedaOtherLinks.style.display = "none"; 
		schedaOtherLinks.style.visibility = "hidden"; 
		
	} else if( scheda == "CSharp" ) {
		schedaPython.style.display = "none"; 
		schedaPython.style.visibility = "hidden";
		schedaCSharp.style.display = "block"; 
		schedaCSharp.style.visibility = "visible"; 
		schedaJavascript.style.display = "none"; 
		schedaJavascript.style.visibility = "hidden"; 
		schedaMySQL.style.display = "none"; 
		schedaMySQL.style.visibility = "hidden"; 
		schedaOtherLinks.style.display = "none"; 
		schedaOtherLinks.style.visibility = "hidden"; 
		
	} else if( scheda == "Javascript" ) {
		schedaPython.style.display = "none"; 
		schedaPython.style.visibility = "hidden";
		schedaCSharp.style.display = "none"; 
		schedaCSharp.style.visibility = "hidden"; 
		schedaJavascript.style.display = "block"; 
		schedaJavascript.style.visibility = "visible";
		schedaMySQL.style.display = "none"; 
		schedaMySQL.style.visibility = "hidden";  
		schedaOtherLinks.style.display = "none"; 
		schedaOtherLinks.style.visibility = "hidden"; 

	} else if( scheda == "MySQL" ) {
		schedaPython.style.display = "none"; 
		schedaPython.style.visibility = "hidden";
		schedaCSharp.style.display = "none"; 
		schedaCSharp.style.visibility = "hidden"; 
		schedaJavascript.style.display = "none"; 
		schedaJavascript.style.visibility = "hidden"; 
		schedaMySQL.style.display = "block"; 
		schedaMySQL.style.visibility = "visible"; 
		schedaOtherLinks.style.display = "none"; 
		schedaOtherLinks.style.visibility = "hidden"; 

	} else if( scheda == "altriLinks" ) {
		schedaPython.style.display = "none"; 
		schedaPython.style.visibility = "hidden";
		schedaCSharp.style.display = "none"; 
		schedaCSharp.style.visibility = "hidden"; 
		schedaJavascript.style.display = "none"; 
		schedaJavascript.style.visibility = "hidden"; 
		schedaMySQL.style.display = "none"; 
		schedaMySQL.style.visibility = "hidden"; 
		schedaOtherLinks.style.display = "block"; 
		schedaOtherLinks.style.visibility = "visible"; 
	}
	

}



