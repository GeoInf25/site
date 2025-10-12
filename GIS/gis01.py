
# __all__ necessario 
# __all_ = [ "variable" ] #Esportazione variabili

import folium 
from pyscript import display

m = folium.Map(location=[48, -102], zoom_start=3 )
display( m, target="map")

