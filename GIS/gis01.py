
# __all__ necessario 
# __all_ = [ "variable" ] #Esportazione variabili

import folium
from folium.plugins import MousePosition
from folium.plugins import Draw
from folium.plugins import MeasureControl
from folium.plugins import MiniMap
from folium.plugins import MarkerCluster

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

from random import randint 

#ufo_data = pd.read_csv( "UfoDataset.csv" , names=column_names, engine='python' )

fig = folium.Figure(width="100%", height="100%")
m = folium.Map( location=[48, -102], zoom_start=2 , control_scale = True ).add_to( fig )

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

document.getElementById("txt_queryUfoDb").value = "select * from Ufo where year ='1949'"

connection = None
tempQuery = None
dfRes = None
"""
ff = folium.Marker(
    location=[ 36.0 , -106.0 ],
)
"""

#cont = 0
#livello = 450

#avoid color: lightgray , white

colorIconFolium = [ 'black', 'beige', 'lightblue', 'blue', 'cadetblue', 'lightgreen', 'lightred', 'orange', 'darkblue', 'gray', 'pink', 'green', 'darkpurple', 'red', 'purple', 'darkred', 'darkgreen' ]


#marker_cluster = MarkerCluster( name = "MC" )
"""
folium.Marker(
    location=[40.67, -73.94],
    popup="Add popup text here.",
    #icon=folium.Icon(color="green", icon="ok-sign"),
).add_to(marker_cluster)

folium.Marker(
    location=[44.67, -73.94],
    popup="Add popup text here.",
    #icon=folium.Icon(color="red", icon="remove-sign"),
).add_to(marker_cluster)
"""
#marker_cluster.add_to( m )

#folium.TileLayer('Stamen Terrain').add_to(m)

"""
folium.Marker(
    location=[40.67, -73.94],
    popup="Add popup text here.",
    icon=folium.Icon(color="green", icon="ok-sign"),
).add_to(marker_cluster)

folium.Marker(
    location=[44.67, -73.94],
    popup="Add popup text here.",
    icon=folium.Icon(color="red", icon="remove-sign"),
).add_to(marker_cluster)

folium.Marker(
    location=[44.67, -71.94],
    popup="Add popup text here.",
    icon=None,
).add_to(marker_cluster)
"""

#folium.LayerControl( autoZIndex = True ).add_to(m)
#LC = folium.LayerControl()

def executeQueryUfoDbFromField( *args ):
    try:
        #global fig
        #global  cont

        #global livello
        #global LC

        global colorIconFolium

        global m

        global connection
        global tempQuery
        global dfRes

        tempQuery = "select * from Ufo where year = '" + document.getElementById( "num_annoAvvistamentoUFO" ).value + "'"
        document.getElementById("txt_queryUfoDb").value = tempQuery

        executeQueryUfoDb()

        #print( dfRes )

        if( not( dfRes is None ) ):

            tempIndexColor = randint( 0, len( colorIconFolium ) - 1 )

            nameLayer = str( dfRes.at[ 0, "year" ] )

            #tempPanel = folium.map.CustomPane( nameLayer, z_index=livello ).add_to( m )
            #tempMC = MarkerCluster( name = nameLayer, options={ 'clusterPane': tempPanel } )
            tempMC = MarkerCluster( name = nameLayer )
            #livello = livello + 10

            for row in range( 0 , len( dfRes ) , 1 ):
                #print( dfRes.at[ row, "latitude" ] )
                tempM = folium.Marker(
                    location=[ dfRes.at[ row, "latitude" ] , dfRes.at[ row, "longitude" ] ],
                    #tooltip="Click me!",
                    popup= folium.Popup( 
                        "LOCATION: " + str( dfRes.at[ row, "latitude" ] ) + ", " + str( dfRes.at[ row, "longitude" ] ) + "<br>" +
                        "DATE: " + str( dfRes.at[ row, "date" ] ) + "<br>" +
                        "SHAPE: " + str( dfRes.at[ row, "shape" ] ).upper() + "<br>" +
                        "DESCRIPTION: " + str( dfRes.at[ row, "description" ] 
                    ), max_width=200 ), 
                    #icon=folium.Icon(icon="cloud"),
                    icon=folium.Icon(color= colorIconFolium[ tempIndexColor ], icon='info-sign')
                ) #.add_to( m )
                
                tempMC.add_child( tempM ) 
            
            
            #tempMC.add_to( tempPanel )
            
            #location=dfRes[["latitude","longitude"]]
            #MarkerCluster(location).add_to(m)
            
            """
            ff = folium.Marker(
                location=[ 36.0 , -106.0 ],
            )

            ff.add_to( m )
            """

        """
        cont = cont + 1

        if( cont >= 2 ): 
            display( m, target="foliumMap")
            pass
        """

        #global marker_cluster

        #tempFG = folium.FeatureGroup(name= "FG_" + nameLayer, control=True).add_to(m)

        tempMC.add_to( m )

        #document.getElementById( "foliumMap" ).lastChild.lastChild.contentWindow.removeLC( ) 
        #document.getElementById( "foliumMap" ).lastChild.lastChild.contentWindow.addLC( ) 

        #LC.reset()
        #print( LC.get_name() )
        #LC.add_to( m )
        #document.getElementById( "foliumMap" ).lastChild.lastChild.contentWindow.removeLC( "{LC}".replace("{LC}", LC.get_name() ) ) 
        

        #m.keep_in_front( tempMC )

        #icon2 = folium.Icon(color= colorIconFolium[ tempIndexColor ], icon='info-sign')
        #document.getElementById( "foliumMap" ).lastChild.lastChild.contentWindow.addMarker( ) 

        #console.log( "ZZZZZ " + document.getElementById( "foliumMap" ).lastChild.childNodes.length )
        """
        document.getElementById("foliumMap").remove();
        div = document.createElement("div");
        div.id = "foliumMap" 
        document.getElementById("contFoliumMap").appendChild(div);

        display( fig, target="foliumMap")
        """

        #document.getElementById( "foliumMap" ).lastChild.lastChild.contentWindow.location.href = document.getElementById( "foliumMap" ).lastChild.lastChild.contentWindow.location.href
        display( fig, target="foliumMap")
        document.getElementById( "foliumMap" ).removeChild( document.getElementById( "foliumMap" ).firstChild )
        #document.getElementById( "foliumMap" ).lastChild.lastChild.contentWindow.location.reload()

        #document.getElementById( "foliumMap" ).replaceChild( fig , document.getElementById( "foliumMap" ).childNodes[0] ) #error

        #m.get_root().header.add_child(folium.CssLink('https://unpkg.com/@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css'))
        #m.get_root().header.add_child(folium.JavascriptLink('https://unpkg.com/@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.min.js'))

        #custom_js = f"""
        #    console.log( 'EEE ' + {m.get_name()} )
        #"""

        #m.get_root().script.add_child(folium.Element(custom_js))

        #script = document.createElement('script')
        #script.innerHTML =  "console.log( 'UUU' )"
        #document.getElementById( "foliumMap" ).lastChild.lastChild.contentWindow.document.body.appendChild(script);

        #console.log( "" + str( m.get_root().render() ) )


        #console.log( document.getElementById( "foliumMap" ).lastChild.lastChild.contentWindow )
        
        #print( "DOPO : " + str( document.getElementById( "foliumMap" ).childNodes.length ) )

        #console.log( document.getElementById( "foliumMap" ).lastChild.lastChild.contentWindow )

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

#print( "AAA " + str( nameFoliumMap ) )

m.get_root().html.add_child(folium.Element("""
    <script type="text/javascript">     

        $.getScript('./GIS/foliumJS.js', function() {
                //alert('Load was performed.');
        })                            

        $(document).ready(function () {
            //var markers = L.markerClusterGroup(); //L.marker([0, 0] )
            addFoliumFunc( {map} );
        });                      

    </script>
""".replace("{map}", nameFoliumMap)
)
)

# m.get_root().script.add_child( folium.Element( "addMarker(  )" )) #inizio script

#display( fig, target="foliumMap")

"""
ff = folium.Marker(
    location=[ 36.0 , -106.0 ],
)

ff.add_to( m )
"""
display( fig, target="foliumMap")
#document.getElementById( "foliumMap" ).appendChild( fig ) Error

"""
m.get_root().header.add_child(folium.JavascriptLink("https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/leaflet.markercluster.js"))
m.get_root().header.add_child(folium.CssLink("https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/MarkerCluster.Default.css"))
m.get_root().header.add_child(folium.CssLink("https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/MarkerCluster.Default.min.css"))
"""

#print( "PRIMA : " + str( document.getElementById( "foliumMap" ).childNodes.length ) )

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



