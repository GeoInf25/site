
# __all__ necessario 
# __all_ = [ "variable" ] #Esportazione variabili

import folium
from folium.plugins import MousePosition
from folium.plugins import Draw
from folium.plugins import MeasureControl

from folium.utilities import JsCode
from folium.elements import EventHandler

from folium.elements import *

import sqlite3
import pandas as pd 
from pyscript import display

from js import console, document, window
import js

#ufo_data = pd.read_csv( "UfoDataset.csv" , names=column_names, engine='python' )

fig = folium.Figure(width="100%", height="100%")
m = folium.Map( location=[48, -102], zoom_start=2 ).add_to( fig )

#print( m.get_name() )

formatter = "function(num) {return L.Util.formatNum(num, 4) + ' º ';};"

MousePosition(
    position="topright",
    separator=" | ",
    empty_string="Coordinates: -- | -- °",
    lng_first=True,
    num_digits=20,
    prefix="Coordinates:",
    lat_formatter=formatter,
    lng_formatter=formatter,
).add_to(m)

Draw(export=False).add_to(m)

MeasureControl().add_to(m)

#fetch pyscript
try: 
    """
    connection = sqlite3.connect("UfoDb.db")
    tempQuery = "SELECT * FROM Ufo where year = '1949' "

    dfRes = pd.read_sql( sql = tempQuery , con = connection ) 

    for row in range( 0 , len( dfRes ) , 1 ):
        folium.Marker(
            location=[ dfRes.at[ row, "latitude" ] , dfRes.at[ row, "longitude" ] ],
            #tooltip="Click me!",
            popup= folium.Popup( str( dfRes.at[ row, "shape" ] ).upper() + " | " + str( dfRes.at[ row, "description" ] ), max_width=200 ), 
            #icon=folium.Icon(icon="cloud"),
        ).add_to(m)
    """

    
except Exception as e:
    print( f"Error detected: {str(e)}" )

"""
print("Number of dimensions:", ufo_data.ndim)
print("Number of rows:", len(ufo_data))
print("Total elements:", ufo_data.size)
print("Shape of the DataFrame:", ufo_data.shape)"
"""

#js.nameFoliumMap = m.get_name()

mapJsVar = m.get_name()

m.get_root().html.add_child(folium.Element("""
<script type="text/javascript">
                                           
$.getScript('./GIS/foliumJS.js', function() {
    //alert('Load was performed.');
});

$(document).ready(function () {
    addFoliumFoo( {map} );
});

</script>
""".replace("{map}", mapJsVar)))

display( fig, target="foliumMap")

tt = pd.DataFrame(
    data={"animal_1": ["animal01", "animal02"], "animal_2": ["animal03", "animal04"]}
)

document.getElementById( "test" ).innerHTML = tt.to_markdown(tablefmt="grid")

#display( tt.to_markdown(tablefmt="grid") , target="resQueryUfoDb" )
#display( tt , target="resQueryUfoDb" )

