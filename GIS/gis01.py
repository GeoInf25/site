
# __all__ necessario 
# __all_ = [ "variable" ] #Esportazione variabili

import folium, pandas as pd 
from pyscript import display

from js import console, document, window
import js

m = folium.Map(location=[48, -102], zoom_start=3 )

column_names = ["datetime", "city", "state", "country", "shape", "duration_seconds", "duration_text", "description", "report_date", "latitude", "longitude" ]

#fetch pyscript
try: 
    ufo_data = pd.read_csv( "UfoDataset.csv" , names=column_names, engine='python' )
except Exception as e:
    print( f"Error detected: {str(e)}" )

print("Number of dimensions:", ufo_data.ndim)
print("Number of rows:", len(ufo_data))
print("Total elements:", ufo_data.size)
print("Shape of the DataFrame:", ufo_data.shape)


display( m, target="foliumMap")

