
# __all__ necessario 
# __all_ = [ "variable" ] #Esportazione variabili

import folium
import sqlite3
import pandas as pd 
from pyscript import display

from js import console, document, window
import js

#ufo_data = pd.read_csv( "UfoDataset.csv" , names=column_names, engine='python' )

m = folium.Map(location=[48, -102], zoom_start=2 )

#fetch pyscript
try: 
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

    
except Exception as e:
    print( f"Error detected: {str(e)}" )

"""
print("Number of dimensions:", ufo_data.ndim)
print("Number of rows:", len(ufo_data))
print("Total elements:", ufo_data.size)
print("Shape of the DataFrame:", ufo_data.shape)"
"""


display( m, target="foliumMap")

