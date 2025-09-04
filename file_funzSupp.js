
function gestioneSchede( scheda ) {
	
	var schedaPython = document.getElementById( "schedaPython" ); 
	var schedaCSharp = document.getElementById( "schedaCSharp" ); 
	var schedaJavascript = document.getElementById( "schedaJavascript" ); 
	
	if( scheda == "Python" ) {
		schedaPython.style.display = "block"; 
		schedaPython.style.visibility = "visible";
		schedaCSharp.style.display = "none"; 
		schedaCSharp.style.visibility = "hidden"; 
		schedaJavascript.style.display = "none"; 
		schedaJavascript.style.visibility = "hidden"; 
		
	} else if( scheda == "CSharp" ) {
		schedaPython.style.display = "none"; 
		schedaPython.style.visibility = "hidden";
		schedaCSharp.style.display = "block"; 
		schedaCSharp.style.visibility = "visible"; 
		schedaJavascript.style.display = "none"; 
		schedaJavascript.style.visibility = "hidden"; 
		
	} else if( scheda == "Javascript" ) {
		schedaPython.style.display = "none"; 
		schedaPython.style.visibility = "hidden";
		schedaCSharp.style.display = "none"; 
		schedaCSharp.style.visibility = "hidden"; 
		schedaJavascript.style.display = "block"; 
		schedaJavascript.style.visibility = "visible"; 
	}
	

}



