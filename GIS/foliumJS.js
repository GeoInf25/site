
function addFoliumFoo( map ) {
    map.on("click", eventClick);

    function eventClick(e) {
        const marker = new L.marker(e.latlng, {
        draggable: false,
        }).addTo( map );

        //map.setView([0, 0], 0);

    }
}