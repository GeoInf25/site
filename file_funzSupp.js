
function gestioneSchede( scheda ) {
	
	var schedaPython = document.getElementById( "Python" ); 
	var schedaC# = document.getElementById( "C#" ); 
	var schedaJavascript = document.getElementById( "Javascript" ); 
	
	if( scheda == "Python" ) {
		schedaPython.style.display = "block"; 
		schedaPython.style.visibility = "visible";
		schedaC#.style.display = "none"; 
		schedaC#.style.visibility = "hidden"; 
		schedaJavascript.style.display = "none"; 
		schedaJavascript.style.visibility = "hidden"; 
		
	} else if( scheda == "C#" ) {
		schedaPython.style.display = "none"; 
		schedaPython.style.visibility = "hidden";
		schedaC#.style.display = "block"; 
		schedaC#.style.visibility = "visible"; 
		schedaJavascript.style.display = "none"; 
		schedaJavascript.style.visibility = "hidden"; 
		
	} else if( scheda == "Javascript" ) {
		schedaPython.style.display = "none"; 
		schedaPython.style.visibility = "hidden";
		schedaC#.style.display = "none"; 
		schedaC#.style.visibility = "hidden"; 
		schedaJavascript.style.display = "block"; 
		schedaJavascript.style.visibility = "visible"; 
	}
	
}