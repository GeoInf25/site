
# __all__ necessario 
# __all_ = [ "variable" ] #Esportazione variabili

import sqlite3
from prettytable import from_db_cursor
from random import randint

from js import console, document, window
from pyodide.ffi.wrappers import add_event_listener

import js

connection = None

def controlConnection( *args ):
  global connection
  print( "Controllo Scheda Database: " + str( js.schedaDabaseCliccata ) )
  if( js.schedaDabaseCliccata == True ):
    #document.getElementById("txt_displayTabClassDbEs01").innerHTML = ""
    #document.getElementById("txt_displayTabStudentDbEs01").innerHTML = ""
    document.getElementById("txt_displayQuerySQLDbEs01").value = "" + document.getElementById("select_listQuerySQLDb01").value; #innerHTML
    connection = sqlite3.connect( ":memory:" ) #https://geoinf25.github.io/site/Database/dbSqliteEs01.db
    tablePopulating()
    executeQuerySQL()

    
  else:
    if( not ( connection is None ) ):
      connection.close()
    document.getElementById("txt_displayTabClassDbEs01").innerHTML = ""
    document.getElementById("txt_displayTabStudentDbEs01").innerHTML = ""
    #print( "Controllo connessione terminata ... " )

#Variables
idClasse = 0 #incr
idStudente = 0 #incr
nome = [ "Alessandro", "Marco", "Michele", "Rolando", "Chiara", "Francesca", "Fernanda", "Giulia", "Alberto", "Daniele", "Gianni", "Paolo", "Veronica", "Margherita", "Annalisa", "Carmelo", "Pasquale", "Sonia", "Vincenzo", "Salvatore" ]
cognome = [ "Veroli", "Bertoldi", "D'Addetta", "Del Fabbro", "Malfer", "Bassetti", "Ferri", "Righi", "Calza'", "Viola", "Rossi", "Neri", "Bianchi", "Bettoni", "Flessati", "Russo", "Greco", "Bianco", "Esposito", "Romeo" ]
#eta randint(18, 45) limite incluso
luogoNascita = [ "Arco", "Riva del Garda", "Rovereto", "Storo", "Trento", "Bolzano", "Brescia", "Palermo", "Affi", "Verona", "Treviso", "Portograuro", "Vicenza", "Napoli", "Mantova" ]
superficie = [ 25, 30, 35, 40, 45, 50, 70, 100 ]
piano = [ -1, 0, 1, 2, 3, 4, 5 ]
tipo = [ "Aula", "Laboratorio fisica", "Palestra", "Aula CAD", "Aula informatica" ]
  
def tablePopulating( *args ):
  try: 
    global connection

    totIDTabClass = int( document.getElementById( "totIDTabClass" ).value )
    totIDTabStudent = int( document.getElementById( "totIDTabStudent" ).value )
    #connection = sqlite3.connect( ":memory:" ) #https://geoinf25.github.io/site/Database/dbSqliteEs01.db
    print("connection.total_changes: " + str( connection.total_changes ) )
    cursor = connection.cursor()

    cursor.execute("DROP TABLE IF EXISTS Classe")
    cursor.execute("DROP TABLE IF EXISTS Studente")

    cursor.execute("CREATE TABLE IF NOT EXISTS Classe (idClass INTEGER, superficieMq INTEGER, piano INTEGER, tipo TEXT )")
    cursor.execute("CREATE TABLE IF NOT EXISTS Studente (idStud INTEGER, nome TEXT, cognome TEXT, eta INTEGER, luogoNascita TEXT, idClass INTEGER )")

    idClasse = 0
    idStudente = 0

    #print( nome[ randint(0, len(nome)-1) ] )

    for i in range(0, totIDTabClass, 1): #limite escluso 
      cursor.execute("INSERT INTO Classe VALUES ( ?, ?, ?, ? )", ( 
        idClasse, 
        superficie[ randint(0, len(superficie)-1) ], 
        piano[ randint(0, len(piano)-1) ], 
        tipo[ randint(0, len(tipo)-1) ]
      ))
      idClasse = idClasse + 1

    for i in range(0, totIDTabStudent, 1): #limite escluso 
      cursor.execute("INSERT INTO Studente VALUES ( ?, ?, ?, ?, ?, ? )", ( 
        idStudente, 
        nome[ randint(0, len(nome)-1) ], 
        cognome[ randint(0, len(cognome)-1) ], 
        randint(18, 45), #entrambi i limiti inclusi 
        luogoNascita[ randint(0, len(luogoNascita)-1) ],
        randint(0, ( totIDTabClass - 1 ) ) #conteggio a partire da 0
      ))
      idStudente = idStudente + 1

    connection.commit()

    cursor.execute( "SELECT * FROM Classe" )
    tempResultQuerySQL = from_db_cursor(cursor)
    tempResultQuerySQL.align = "l" 
    document.getElementById("txt_displayTabClassDbEs01").innerHTML = tempResultQuerySQL.get_string()

    cursor.execute( "SELECT * FROM Studente" )
    tempResultQuerySQL = from_db_cursor(cursor)
    tempResultQuerySQL.align = "l" 
    document.getElementById("txt_displayTabStudentDbEs01").innerHTML = tempResultQuerySQL.get_string()

    document.getElementById("txt_displayResultDbEs01").innerHTML = ""

    #connection.close()
    print( "-- Fine valorizzazione Tabelle -- " )

  except Exception as e:
    document.getElementById("txt_displayTabStudentDbEs01").innerHTML = f"Error detected: {str(e)}"
    document.getElementById("txt_displayTabClassDbEs01").innerHTML = "--"

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
      document.getElementById("txt_displayResultDbEs01").innerHTML = tempResultQuerySQL.get_string()
      #connection.close()
    else: 
      document.getElementById("txt_displayResultDbEs01").innerHTML = "Operazione eseguita; mancata restituzione di un Oggetto SQL (None / NoneType Python Object). "

    print( "-- Fine Esecuzione Query SQL -- " )

  except Exception as e:
    document.getElementById("txt_displayResultDbEs01").innerHTML = f"Error detected: {str(e)}"

"""
add_event_listener( document.getElementById("btn_tablePopulating") , "click", tablePopulating)
add_event_listener( document.getElementById("btn_executeQuerySQL") , "click", executeQuerySQL)	

#Schede
add_event_listener( document.getElementById("tab_schedaPython") , "click", controlConnection ) #Privo di argomenti 
add_event_listener( document.getElementById("tab_schedaCSharp") , "click", controlConnection )	
add_event_listener( document.getElementById("tab_schedaJavascript") , "click", controlConnection )	
add_event_listener( document.getElementById("tab_schedaJava") , "click", controlConnection )	
add_event_listener( document.getElementById("tab_schedaDatabase") , "click", controlConnection )	
add_event_listener( document.getElementById("tab_schedaGIS") , "click", controlConnection )	
add_event_listener( document.getElementById("tab_schedaDisegni3D") , "click", controlConnection )
add_event_listener( document.getElementById("tab_schedaAltriLinks") , "click", controlConnection )	
"""

#Test iniziale all'apertura della Pagina Web
#if( window.sessionStorage.getItem( "superatoPrimoAvvio2" ) is None ):
#document.getElementById("btn_tablePopulating").click(); 
#window.sessionStorage.setItem( "superatoPrimoAvvio2" , 1 ) 
