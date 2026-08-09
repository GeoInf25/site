

dataConsoleApp = [
	/*{
	    DateTime: "", 
		Event: "",
		Message_ConsoleApp: "",
				 
	},*/
];

consoleApp = new Tabulator( "#consoleApp", {
    data: dataConsoleApp, // Carica i dati 
    //autoColumns: true, // Crea automaticamente le colonne in base alle chiavi 

    layout: "fitColumns", 
    //height: "100%", //Evitare per MANCANZA di SCROLLBAR verticale

    columns: [
        {title: `${ lang=='eng' ? 'DateTime' : 'Data-Orario' }`, headerTooltip: true , field: "DateTime", widthGrow: 2, formatter: "textarea", resizable: false},
        {title: `${ lang=='eng' ? 'Event' : 'Evento' }`, headerTooltip: true , field: "Event", widthGrow: 2, formatter: "textarea", resizable: false},
        {title: `${ lang=='eng' ? 'Message_Console' : 'Messaggio_Console' }`, headerTooltip: true , field: "Message_ConsoleApp", widthGrow: 7, formatter: "textarea", resizable: false},

        
    ],

    footerElement: 
        `<div style='height: 2vh'> 
            <button style='font-family: ${font}; font-size: 1.5vh; font-style: italic; cursor: pointer; margin-right: 5px; '
            onclick='consoleApp.download("xlsx", "Message_Console.xlsx", {sheetName: "Sheet01"});'>
                ${ lang=='eng' ? "Export XLSX" : "Esporta XLSX" }
            </button>
            <button style='font-family: ${font}; font-size: 1.5vh; font-style: italic; cursor: pointer; margin-right: 5px; '
            onclick='consoleApp.download("csv", "Message_Console.csv");'>
                ${ lang=='eng' ? "Export CSV" : "Esporta CSV" } 
            </button> 
            <button style='font-family: ${font}; font-size: 1.5vh; font-style: italic; cursor: pointer; margin-right: 5px; '
            onclick='consoleApp.download("pdf", "Message_Console.pdf");'>
                ${ lang=='eng' ? "Export PDF" : "Esporta PDF" }
            </button>
        </div>` 

});

//consoleApp.element.style.fontFamily = "'Courier New', monospace";
consoleApp.element.style.fontSize = "1.5vh";


//tab_consoleApp.js