
function gestioneSchede( scheda ) {
	
	var schedaPython = document.getElementById( "tab_Python" ); 
	var schedaCSharp = document.getElementById( "tab_CSharp" ); 
	var schedaJavascript = document.getElementById( "tab_Javascript" ); 
	
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


