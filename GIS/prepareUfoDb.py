import os
import pandas as pd
import sqlite3

column_names = ["datetime", "city", "state", "country", "shape", "duration_seconds", "duration_text", "description", "report_date", "latitude", "longitude"]

df = pd.read_csv('UfoDataset.csv' , names=column_names, engine="python")  

df[['date','time']] = df.datetime.str.split(" ",expand=True)  

df[['year']] = df.date.apply( lambda x: pd.Series(str(x)[ len(str(x))-4 : len(str(x)) ] ))  

#Control
#df.head()

df = df.rename( columns={ "datetime" : "bakDatetime" } )

bakDatetime = df.pop( "bakDatetime" )
df.insert( len( df.columns )-1, "bakDatetime", bakDatetime)

time = df.pop( "time" )
df.insert(0, "time", time)

date = df.pop( "date" )
df.insert(0, "date", date)

year = df.pop( "year" )
df.insert(0, "year", year)

connection = sqlite3.connect("UfoDb.db")

df.to_sql( name="Ufo" , con=connection )

"""
cursor = connection.cursor()

rows = cursor.execute("SELECT * FROM Ufo limit 10").fetchall()

for row in rows:
    print(row)

from UfoDb import *

"""
