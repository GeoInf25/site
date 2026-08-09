

for( var i = 0; i < 7; i++ ) {
    // p descr00TabScheda00
    var p = document.createElement("p");
    p.id = "descr" + ( ("0" + i).slice( - 2 ) ) + "TabScheda00"; 

    p.style = 
    `font-family: ${font}; font-size: 1.6vh; 
        margin-left: 0; margin-right: 0; margin-top: 0; margin-bottom: 0.75vh;
        padding: 0; 
        display: inline; 
        `; //display: inline; -> MANTENERE SULLA RIGA i contenuti
    switch( i ) {
        case 0: 
            p.innerText = 
            `${ lang == 'eng' 
                ? 
                `- Number of customers per community or per individual Customer Marker [customers]: ` 
                : 
                `- Numero di clienti per comunità o per singolo indicatore cliente [clienti]: ` 
            }`;
            break;
        case 1:
            p.innerText = 
            `${ lang == 'eng' 
                ? 
                `- Cost per km for electric car / Euro spent per kilometer (electric car) [€/Km]: ` 
                : 
                `- Costo per km per auto elettrica / Euro spesi per chilometro (auto elettrica) [€/km]: ` 
            }`;
            break;
        case 2:
            p.innerText = 
            `${ lang == 'eng' 
                ? 
                `- Cost of activation and maintenance of existing station [€]: ` 
                : 
                `- Costo di attivazione e manutenzione della stazione esistente [€]: ` 
            }`;
            break;
        case 3:
            p.innerText = 
            `${ lang == 'eng' 
                ? 
                `- Cost of activation and maintenance of newly - built station [€]: ` 
                : 
                `- Costo di attivazione e manutenzione della stazione di nuova costruzione [€]: ` 
            }`;
            break;
        case 4:
            p.innerText = 
            `${ lang == 'eng' 
                ? 
                `- Plant Factor   * marketsPOI: ` 
                : 
                `- Fattore Impianto   * marketsPOI: ` 
            }`;
            break;
        case 5:
            p.innerText = 
            `${ lang == 'eng' 
                ? 
                ` * existingChargingStationsPOI: ` 
                : 
                ` * Stazione di Ricarica esistente: ` 
            }`;
            break;
        case 6:
            p.innerText = 
            `${ lang == 'eng' 
                ? 
                ` * parkingAreasPOI: ` 
                : 
                ` * Area di Parcheggio: ` 
            }`;
            break;
            
    }
    
    document.getElementById("tab_scheda00").appendChild(p);

    // input value00TabScheda00
    var input = document.createElement('input');
    input.type = 'text';
    input.id = "value" + ( ("0" + i).slice( - 2 ) ) + "TabScheda00";
    input.default = null; //Valore predefinito

    input.style = `width: ${ ( i != 4 && i != 5 && i != 6 ? "15%" : "6%" )}; 
        font-family: ${font}; font-size: 1.6vh; font-weight: bold;  
        margin-left: 0; margin-right: 0; margin-top: 0; margin-bottom: 0.75vh;
        padding: 0; 
        border-top: none; border-bottom: 1px solid ; border-right: none; border-left: none; 
        `; 

    input.addEventListener('blur', function() {
        // Evento pensato quando l'utente esce
        if( isNaN( this.value ) ) {
            this.value = this.default;
        } 
    });  

    switch( i ) {
        case 0: input.value = input.default =  "3500"; break;
        case 1: input.value = input.default =  "0.50"; break;
        case 2: input.value = input.default =  "120.00"; break;
        case 3: input.value = input.default =  "1200.00"; break;
        case 4: input.value = input.default =  "0.40"; break;
        case 5: input.value = input.default =  "1.0"; break;
        case 6: input.value = input.default =  "0.50"; break;
    }

    document.getElementById("tab_scheda00").appendChild( input );

    if( i != 4 && i != 5) { //Esclusione per Plant Factor (Fattore Impianto)
        var br = document.createElement("br");
        document.getElementById("tab_scheda00").appendChild( br );
    }

}
