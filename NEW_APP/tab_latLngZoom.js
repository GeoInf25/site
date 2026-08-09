

dataLatLngZoom = [
	{
		Coordinates:
			[ 
				(lang == "eng" ? "Latitude: " : "Latitudine: " ) , "--" , 
				(lang == "eng" ? "Longitude: " : "Longitudine: ") , "--" , 
				(lang == "eng" ? "Zoom: " : "Zoom: ") , "10.00"
			]
	},
]; 

latLngZoom = new Tabulator( "#latLngZoom", {
	data: dataLatLngZoom, // Carica i dati 
	layout: "fitColumns", 
	//height: "100%", //Evitare per MANCANZA di SCROLLBAR verticale
			
	//autoColumns: true, // Crea automaticamente le colonne in base alle chiavi 
	columns: [ 
		{title: `${ lang=='eng' ? 'Coordinates' : 'Coordinate' }` , headerTooltip: true , field: "Coordinates", widthGrow: 1, resizable: false ,  
			//formatter: "textarea"
			formatter: function(cell) { 
				arr = cell.getValue();
				return( arr[0] + arr[1] + ", " + arr[2] + arr[3] + ", " + arr[4] + arr[5] ); 
			}
		},
	],
			
	footerElement: 
        "<div style='height: 0.2vh'>" +
			"<br>" + 
		"</div>"
	});


latLngZoom.element.style.fontSize = "1.5vh";


//tab_latlngZoom.js

