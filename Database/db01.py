
# __all__ necessario 
# __all_ = [ "variable" ] #Esportazione variabili

import sqlite3
from prettytable import from_db_cursor
from random import randint

from js import console, document, window, Tabulator
from pyodide.ffi.wrappers import add_event_listener

import js
import json

from pyodide.ffi import to_js

connection = None

'''
def controlConnection( *args ):
global connection
print( "Controllo Scheda Database: " + str( window.parent.schedaDatabaseCliccata ) )
if( window.parent.schedaDatabaseCliccata == True ):
    #document.getElementById("txt_displayTabClassDbEs01").innerHTML = ""
    #document.getElementById("txt_displayTabStudentDbEs01").innerHTML = ""
'''

def controlConnection( *args ):  
  global connection 
  #document.getElementById("txt_displayQuerySQLDbEs01").value = "" + document.getElementById("select_listQuerySQLDb01").value; #innerHTML
  connection = sqlite3.connect( ":memory:" ) #https://geoinf25.github.io/site/Database/dbSqliteEs01.db 
  tablePopulating()
  executeQuerySQL()

'''  
  else:
    if( not ( connection is None ) ):
      connection.close()
    document.getElementById("txt_displayTabClassDbEs01").innerHTML = ""
    document.getElementById("txt_displayTabStudentDbEs01").innerHTML = ""
    #print( "Controllo connessione terminata ... " )
'''

def closeDB( *args ):
  if( not ( connection is None ) ):
    connection.close()
  #print( "Controllo connessione terminata ... " )

add_event_listener( window , "beforeunload", closeDB ) 


#Variables
idClass = 0 #incr
idStudent = 0 #incr
name = [ "Alexander", "Mark", "Michael", "Roland", "Claire", " Frances", "Fernanda", "Julia", "Albert", "Daniel", "John", "Paul", "Veronica", "Margaret", "Annalise", "Carmine", "Pascal", "Sonya", "Vincent", "Sam" ]
surname = [ "Smith", "Baker", "Miller", "Taylor", "Fisher", "Johnson", "Jackson", "Wilson", "Davis", "Jones", "Brooks", "Hill", "Wood", "Green", "Moore", "Brown", "White", "Young", "Long", "King" ]
#eta randint(18, 45) limite incluso
birthPlace = [ "London", "Paris", "Rome", "Berlin", "Madrid", "Amsterdam", "Vienna", "Athens", "New York", "Los Angeles", "Chicago", "Miami", "San Francisco", "Boston", "Seattle" ]
areaSqMt = [ 25, 30, 35, 40, 45, 50, 70, 100 ]
floor = [ -1, 0, 1, 2, 3, 4, 5 ]
kind = [ "Classroom", "Physics lab", "Gym", "CAD Lab", "Computer Lab" ]
  
def tablePopulating( *args ):
  try: 
    global connection

    totIDTabClass = int( document.getElementById( "totIDTabClass" ).value )
    totIDTabStudent = int( document.getElementById( "totIDTabStudent" ).value )
    #connection = sqlite3.connect( ":memory:" ) #https://geoinf25.github.io/site/Database/dbSqliteEs01.db
    print("connection.total_changes: " + str( connection.total_changes ) )
    cursor = connection.cursor()

    cursor.execute("DROP TABLE IF EXISTS Class")
    cursor.execute("DROP TABLE IF EXISTS Student")

    cursor.execute("CREATE TABLE IF NOT EXISTS Class (idClass INTEGER, areaSqMt INTEGER, floor INTEGER, kind TEXT )")
    cursor.execute("CREATE TABLE IF NOT EXISTS Student (idStud INTEGER, name TEXT, surname TEXT, age INTEGER, birthPlace TEXT, idClass INTEGER )")

    idClass = 0
    idStudent = 0

    #print( nome[ randint(0, len(nome)-1) ] )

    for i in range(0, totIDTabClass, 1): #limite escluso 
      cursor.execute("INSERT INTO Class VALUES ( ?, ?, ?, ? )", ( 
        idClass, 
        areaSqMt[ randint(0, len(areaSqMt)-1) ], 
        floor[ randint(0, len(floor)-1) ], 
        kind[ randint(0, len(kind)-1) ]
      ))
      idClass = idClass + 1

    for i in range(0, totIDTabStudent, 1): #limite escluso 
      cursor.execute("INSERT INTO Student VALUES ( ?, ?, ?, ?, ?, ? )", ( 
        idStudent, 
        name[ randint(0, len(name)-1) ], 
        surname[ randint(0, len(surname)-1) ], 
        randint(18, 45), #entrambi i limiti inclusi 
        birthPlace[ randint(0, len(birthPlace)-1) ],
        randint(0, ( totIDTabClass - 1 ) ) #conteggio a partire da 0
      ))
      idStudent = idStudent + 1

    connection.commit()

    #CODICE RIPETUTO

    cursor.execute( "SELECT * FROM Class" )
    tempResultQuerySQL = from_db_cursor(cursor)
    tempResultQuerySQL.align = "l" 
    tempResultQuerySQL.header = False #Rimuove intestazione PRIMA RIGA
    dataTableClass = json.loads( tempResultQuerySQL.get_json_string() ) 
    js.tableClass.setData( to_js(dataTableClass) ); 

    cursor.execute( "SELECT * FROM Student" )
    tempResultQuerySQL = from_db_cursor(cursor)
    tempResultQuerySQL.align = "l" 
    tempResultQuerySQL.header = False #Rimuove intestazione PRIMA RIGA
    dataTableStudent = json.loads( tempResultQuerySQL.get_json_string() )
    js.tableStudent.setData( to_js(dataTableStudent) ); 

    #FINE CODICE RIPETUTO

    #connection.close()
    print( "-- End Tables Definition -- " )

  except Exception as e:
    print( f"Error detected: {str(e)}" ); 

def executeQuerySQL( *args ):
  try: 
    global connection
    #print( document.getElementById("txt_displayQuerySQLDbEs01").value )
    #connection = sqlite3.connect( ":memory:" ) #https://geoinf25.github.io/site/Database/dbSqliteEs01.db
    cursor = connection.cursor()
    tempResQuery = cursor.execute( document.getElementById("txt_displayQuerySQLDbEs01").value )
    #Condizione tempResQuery is None Falsa
    tempResultQuerySQL = from_db_cursor(cursor)
    if( not( tempResultQuerySQL is None ) ):
      tempResultQuerySQL.align = "l" 
      tempResultQuerySQL.header = False #Rimuove intestazione PRIMA RIGA
      
      #document.getElementById("txt_displayResultDbEs01").innerHTML = tempResultQuerySQL.get_json_string() # ... .innerHTML , tempResultQuerySQL.get_string()
      #jsonResult = json.loads( tempResultQuerySQL.get_json_string() )
      #print( jsonResult )

      #Trasforma la stringa in un oggetto JSON/Dizionario Python
      #dati_json = json.loads(json_string)

      dataTableResult = json.loads( tempResultQuerySQL.get_json_string() )
      js.tableResult.setData( to_js( dataTableResult ) ); 

      #connection.close()
    else: 
      print( "Operation performed; absence of an SQL object (None / NoneType Python Object). " )

    print( "-- End of SQL Query Execution -- " )

    if "Update" in str( document.getElementById("txt_displayQuerySQLDbEs01").value ): 
      #CODICE RIPETUTO
      cursor.execute( "SELECT * FROM Class" )
      tempResultQuerySQL = from_db_cursor(cursor)
      tempResultQuerySQL.align = "l" 
      tempResultQuerySQL.header = False #Rimuove intestazione PRIMA RIGA
      dataTableClass = json.loads( tempResultQuerySQL.get_json_string() ) 
      js.tableClass.setData( to_js(dataTableClass) ); 

      cursor.execute( "SELECT * FROM Student" )
      tempResultQuerySQL = from_db_cursor(cursor)
      tempResultQuerySQL.align = "l" 
      tempResultQuerySQL.header = False #Rimuove intestazione PRIMA RIGA
      dataTableStudent = json.loads( tempResultQuerySQL.get_json_string() )
      js.tableStudent.setData( to_js(dataTableStudent) );
      #CODICE RIPETUTO

  except Exception as e:
    print( f"Error detected: {str(e)}" )


add_event_listener( document.getElementById("btn_tablePopulating") , "click", tablePopulating)
add_event_listener( document.getElementById("btn_executeQuerySQL") , "click", executeQuerySQL)	

#*** AVVIO APPLICAZIONE ***
controlConnection()

'''
#Schede
add_event_listener( window.parent.document.getElementById("tab_schedaReact") , "click", controlConnection ) #Privo di argomenti 
add_event_listener( window.parent.document.getElementById("tab_schedaRShiny") , "click", controlConnection ) #Privo di argomenti 
add_event_listener( window.parent.document.getElementById("tab_schedaJupyter") , "click", controlConnection ) #Privo di argomenti 
add_event_listener( window.parent.document.getElementById("tab_schedaCSharp") , "click", controlConnection )	
add_event_listener( window.parent.document.getElementById("tab_schedaJavascript") , "click", controlConnection )	
add_event_listener( window.parent.document.getElementById("tab_schedaJava") , "click", controlConnection )	
add_event_listener( window.parent.document.getElementById("tab_schedaDatabase") , "click", controlConnection )	
add_event_listener( window.parent.document.getElementById("tab_schedaGIS") , "click", controlConnection )	
add_event_listener( window.parent.document.getElementById("tab_schedaDisegni3D") , "click", controlConnection )
add_event_listener( window.parent.document.getElementById("tab_schedaAbout") , "click", controlConnection )	
'''

#Test iniziale all'apertura della Pagina Web
#if( window.sessionStorage.getItem( "superatoPrimoAvvio2" ) is None ):
#document.getElementById("btn_tablePopulating").click(); 
#window.sessionStorage.setItem( "superatoPrimoAvvio2" , 1 ) 
