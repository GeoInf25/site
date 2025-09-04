
function gestioneSchede( scheda ) {
	
	var schedaPython = document.getElementById( "tab_Python" ); 
	var schedaC# = document.getElementById( "tab_C#" ); 
	var schedaJavascript = document.getElementById( "tab_Javascript" ); 
	
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
