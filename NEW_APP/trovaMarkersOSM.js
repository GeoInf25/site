

trovaMarkersOSM = async ( ) => {

    latNE = map.getBounds()["_northEast"]["lat"] ; 
	lngNE = map.getBounds()["_northEast"]["lng"] ; 
	latSW = map.getBounds()["_southWest"]["lat"] ; 
	lngSW = map.getBounds()["_southWest"]["lng"] ;
	
	//document.getElementById("areaInMappa").value = "" + areaInMappa; 

    const api = await fetch('https://www.overpass-api.de/api/interpreter?', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		//Esempio: body:" [out:json][timeout:60];node(48.865,2.25,48.9,2.27)[amenity=restaurant];out; "
		body:" [out:json][timeout:60];" + 
		"(" + 
		"node" + "[place~\"town|village\"]" + "(" + latSW + ", " + lngSW + ", " + latNE + ", " + lngNE + ")" + ";" + 
		"node" + "[shop=\"supermarket\"]" + "(" + latSW + ", " + lngSW + ", " + latNE + ", " + lngNE + ")" + ";" + 
		"node" + "[amenity=charging_station]" + "(" + latSW + ", " + lngSW + ", " + latNE + ", " + lngNE + ")" + ";" +
		"node" + "[amenity=parking]" + "(" + latSW + ", " + lngSW + ", " + latNE + ", " + lngNE + ")" + ";" +
		");" + 
		"out; "
	})
    
    const risposta = await api.json();
		
	console.log( risposta ); 



}
