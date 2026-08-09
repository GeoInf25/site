

//Link Button for LANGUAGE

var divLanguage = L.control({ position: 'bottomleft' });

divLanguage.onAdd = function (map) {
    var div = L.DomUtil.create('div' ); //, CSS Style ...

    var btnStyle = `background-color: lightgray ; color: red; padding: 0vh 0vh; font-family: ${font}; font-size: 1.5vh; font-weight: bold; font-style: italic; 
        border-radius: 1vh; min-width: 14vh; height: 3.0vh; border-color: red; cursor: pointer; `;
    /*var btnStyle = "background-color: white ; color: green; padding: 0vh 0vh; font-size: 1.8vh; font-weight: bold; border-radius: 1vh; min-width: 15vh; height: 3.5vh; border-color: green;";*/
    /* border: 2px solid yellow; */
    /*lightseagreen*/
    /* 16px */
    /*height: auto; */
    /*color: white;*/

    div.innerHTML = `
        <div style="display: flex; background: #ffffff; border: 0px solid #000000; border-radius: 5px; margin: 0px; padding: 2px;" >
            <div id="rif_LINK_Contenuto" style="display: none" >
                <button id="btn_changeLanguage"  
                    style="${btnStyle}" >
                        ${ lang=='eng' ? "- Language: ENG -" : "- Lingua: ITA -" }
                </button>
            </div>

            <button id="rif_LINK_Button" type="button" style="font-family: ${font}; font-size: 1.5vh; font-style: italic; " >
                ${ lang=='eng' ? "🔄 Show / Hide Buttons" : "🔄 Mostra / Nascondi Pulsanti" }
            </button>
        </div>				
    `;

    //Seleziona il pulsante appena creato e aggiungi l'evento
    div.querySelector('#btn_changeLanguage').addEventListener('click', ( event ) => {
        if( lang == "eng" ) {
            lang = "ita"; 
            localStorage.setItem( "lang" , "ita" ); //MANTENERE STRINGA per "lang"
            event.target.innerText = "- Lingua: ITA -";
        } else {
            lang = "eng"; 
            localStorage.setItem( "lang" , "eng" ); //MANTENERE STRINGA per "lang" 
            event.target.innerText = "- Language: ENG -";
        }
        alert('*** Attenzione! Verrà ricaricata la Pagina Web ... *** \n*** Warning! The Web Page will be reloaded... *** ');
        window.location.reload(); 
    });

    const btn_LINK = div.querySelector('#rif_LINK_Button');
    const contenuto_LINK = div.querySelector('#rif_LINK_Contenuto');
    
    btn_LINK.addEventListener('click', function() {
        if (contenuto_LINK.style.display === 'none') {
            contenuto_LINK.style.display = 'block';
            btn_LINK.textContent = `${ lang=='eng' ? "❌ Hide Buttons" : "❌ Nascondi Pulsanti" }`;
        } else {
            contenuto_LINK.style.display = 'none';
            btn_LINK.textContent = `${ lang=='eng' ? "🔄 Show / Hide Buttons" : "🔄 Mostra / Nascondi Pulsanti" }`;
        }
    });

    L.DomEvent.disableClickPropagation(div);

    return div;

};

divLanguage.addTo(map);

//languageDiv.js
