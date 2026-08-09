getAreaOfMap = () => {
    // Ottieni i confini correnti
    var bounds = map.getBounds();

    // Ottieni il bounding box come array [Ovest, Sud, Est, Nord]
    var bbox = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()];

    // Crea il poligono GeoJSON
    var polygon = turf.bboxPolygon(bbox);

    // Calcola l'area (Turf restituisce metri quadrati di default) in Km² (dividendo per 1.000.000
    var areaKm2 = turf.area(polygon) / 1000000;

    return areaKm2.toFixed(2); 

}


getDateTime = () => {
    tempDateTime = new Date(); 
    dd = ( "" + tempDateTime.getDate() ).padStart(2, '0');
    mm = ("" + (tempDateTime.getMonth() + 1) ).padStart(2, '0'); // Nota: i mesi in JS partono da 0 (0 = Gennaio)
    yyyy = "" + tempDateTime.getFullYear();
    h = ( "" + tempDateTime.getHours()).padStart(2, '0');
    m = ( "" + tempDateTime.getMinutes()).padStart(2, '0');
    s = ( "" + tempDateTime.getSeconds()).padStart(2, '0');
    return "" + dd + "/" + mm + "/" + yyyy + " " + h + ":" + m + ":" + s; 
};

manageTab = ( numbTab ) => {

    for( var i = 0; i<4;  i++ ) { //TOTALE 4 SCHEDE
        var tempName = "tab_scheda" + ( ("0" + i ).slice(-2) );
        //console.log( tempName ); 
        if( i == numbTab ) {
            document.getElementById( tempName ).style.display = "block"; 
            document.getElementById( tempName ).style.visibility = "visible"; 
        } else {
            document.getElementById( tempName ).style.display = "none"; 
            document.getElementById( tempName ).style.visibility = "hidden"; 
        }
    }

}