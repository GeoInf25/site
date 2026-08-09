

$(document).ready(function() {

    // 1. Funzione unica per calcolare e adattare le larghezze
    function adattaLayout() {
        var currentWidthLeft = $("#boxLeft").width();
        var windowWidth = $(window).width();

        // Controllo max-width (95% della finestra)
        if (currentWidthLeft >= (0.95 * windowWidth)) {
            currentWidthLeft = 0.95 * windowWidth;
            $("#boxLeft").css("width", currentWidthLeft + "px"); // Blocca visivamente il boxLeft
        }

        // Calcola e assegna lo spazio rimanente al box di destra
        var remainingWidth = windowWidth - currentWidthLeft - 10;
        $("#boxRight").css("width", remainingWidth + "px");
    }

    // 2. Attiva il ridimensionamento jQuery UI su #boxLeft
    $("#boxLeft").resizable({
        handles: "e", 
        resize: function(event, ui) {
            // Durante il trascinamento usa la logica centralizzata
            adattaLayout();
        }
    });

    // 3. Esegui la funzione al ridimensionamento della finestra browser
    $(window).on('resize', adattaLayout);

    // 4. Esegui la funzione subito al caricamento della pagina (ready)
    adattaLayout();

    //Mappa LEAFLET
    // 1. Seleziona il div che contiene la mappa
    const resizeContainer = document.getElementById('map');

    // 2. Crea il ResizeObserver per aggiornare Leaflet
    const resizeObserver = new ResizeObserver(() => {
        map.invalidateSize();
    });

    // 3. Avvia il monitoraggio sul div
    resizeObserver.observe(resizeContainer);

});