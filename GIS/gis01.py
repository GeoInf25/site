
# __all__ necessario 
# __all_ = [ "variable" ] #Esportazione variabili

import folium
from folium.plugins import MousePosition
from folium.plugins import Draw
from folium.plugins import MeasureControl
from folium.plugins import MiniMap

from folium import plugins

from folium.utilities import JsCode
from folium.elements import EventHandler
from folium.elements import *

import sqlite3
import pandas as pd 
from pyscript import display

from pyodide.ffi.wrappers import add_event_listener

from js import console, document, window
import js

#ufo_data = pd.read_csv( "UfoDataset.csv" , names=column_names, engine='python' )

#fig = folium.Figure(width="100%", height="100%")
m = folium.Map( location=[48, -102], zoom_start=2 ) #.add_to( fig )

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

#print( js.contFoliumMapOffsetHeight <= 270 )

if( js.contFoliumMapOffsetHeight <= 270 ):
    pass
else: 
    MeasureControl().add_to(m)

MiniMap(toggle_display=True , width=100, height=100 ).add_to(m)

#folium.TileLayer('Stamen Terrain').add_to(m)

folium.LayerControl().add_to(m)

document.getElementById("txt_queryUfoDb").value = "select * from Ufo where year ='1949'"

connection = None
tempQuery = None
dfRes = None
"""
ff = folium.Marker(
    location=[ 36.0 , -106.0 ],
)
"""

cont = 0

def executeQueryUfoDbFromField( *args ):
    try:
        #global fig
        global  cont

        global m

        global connection
        global tempQuery
        global dfRes

        tempQuery = "select * from Ufo where year = '" + document.getElementById( "num_annoAvvistamentoUFO" ).value + "'"
        document.getElementById("txt_queryUfoDb").value = tempQuery

        executeQueryUfoDb()

        #print( dfRes )

        if( not( dfRes is None ) ):
            
            for row in range( 0 , len( dfRes ) , 1 ):
                print( dfRes.at[ row, "latitude" ] )
                folium.Marker(
                    location=[ dfRes.at[ row, "latitude" ] , dfRes.at[ row, "longitude" ] ],
                    #tooltip="Click me!",
                    popup= folium.Popup( str( dfRes.at[ row, "shape" ] ).upper() + " | " + str( dfRes.at[ row, "description" ] ), max_width=200 ), 
                    #icon=folium.Icon(icon="cloud"),
                    #icon=folium.Icon(color='blue', icon='info-sign')
                ).add_to(m)
            
            """
            location=dfRes[["latitude","longitude"]]
            plugins.MarkerCluster(location).add_to(m)
            
            ff = folium.Marker(
                location=[ 36.0 , -106.0 ],
            )

            ff.add_to( m )
            """
        cont = cont + 1

        if( cont >= 2 ): 
            display( m, target="foliumMap")

        
        print( "Finish ... ")

    except Exception as e:
        document.getElementById( "txt_resQueryUfoDb" ).value = f"Error detected: {str(e)}"


def executeQueryUfoDbFromUser( *args ):
    try:
        global connection
        global tempQuery
        global dfRes

        tempQuery = str( document.getElementById("txt_queryUfoDb").value )

        executeQueryUfoDb()
    
    except Exception as e:
        document.getElementById( "txt_resQueryUfoDb" ).value = f"Error detected: {str(e)}"


def executeQueryUfoDb( *args ):
    try: 
        global connection
        global tempQuery
        global dfRes

        connection = sqlite3.connect("UfoDb.db")
        #tempQuery = str( document.getElementById("txt_queryUfoDb").value )
        #dfRes

        dfRes = pd.read_sql( sql = tempQuery , con = connection ) 

        document.getElementById( "txt_resQueryUfoDb" ).value = dfRes.to_markdown(tablefmt="grid")

        if( not ( connection is None ) ):
            connection.close()

    except Exception as e:
        document.getElementById( "txt_resQueryUfoDb" ).value = f"Error detected: {str(e)}"

"""
print("Number of dimensions:", ufo_data.ndim)
print("Number of rows:", len(ufo_data))
print("Total elements:", ufo_data.size)
print("Shape of the DataFrame:", ufo_data.shape)"
"""

nameFoliumMap = m.get_name()

m.get_root().html.add_child(folium.Element("""
    <script type="text/javascript">
                                            
    $.getScript('./GIS/foliumJS.js', function() {
        //alert('Load was performed.');
    });

    $(document).ready(function () {
        addFoliumFunc( {map} );
    });

    </script>
""".replace("{map}", nameFoliumMap)
)
)

#display( fig, target="foliumMap")
"""
ff = folium.Marker(
    location=[ 36.0 , -106.0 ],
)

ff.add_to( m )
"""
#display( m, target="foliumMap")


add_event_listener( document.getElementById("btn_executeQueryUfoDb") , "click", executeQueryUfoDbFromUser)
add_event_listener( document.getElementById("num_annoAvvistamentoUFO") , "blur", executeQueryUfoDbFromField)

"""
tt = pd.DataFrame(
    data={"col1": ["animal01", "animal02"], "col2": ["animal03", "animal04"]}
)
"""

#document.getElementById( "test" ).innerHTML = tt.to_markdown(tablefmt="grid")
#display( tt.to_markdown(tablefmt="grid") , target="resQueryUfoDb" )
#display( tt , target="resQueryUfoDb" )

