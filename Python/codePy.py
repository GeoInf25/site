
# __all__ necessario 
# __all_ = [ "variable" ]
__all__ = [  ]

import sqlite3
from prettytable import from_db_cursor
from random import randint

connection = None

add_event_listener( document.getElementById("btn_tablePopulating") , "click", tablePopulating)
add_event_listener( document.getElementById("btn_executeQuerySQL") , "click", executeQuerySQL)	

#Schede
add_event_listener( document.getElementById("tab_schedaPython") , "click", controlConnection( "schedaPython" ) )	
add_event_listener( document.getElementById("tab_schedaCSharp") , "click", controlConnection( "schedaCSharp" ) )	
add_event_listener( document.getElementById("tab_schedaJavascript") , "click", controlConnection ("schedaJavascript" ) )	
add_event_listener( document.getElementById("tab_schedaJava") , "click", controlConnection( "schedaJava" ) )	
add_event_listener( document.getElementById("tab_schedaDatabase") , "click", controlConnection( "schedaDatabase" ) )	
add_event_listener( document.getElementById("tab_schedaDisegni3D") , "click", controlConnection( "schedaDisegni3D" ) )
add_event_listener( document.getElementById("tab_schedaAltriLinks") , "click", controlConnection( "schedaAltriLinks" ) )		

def controlConnection( scheda ):
  if( scheda == "schedaDatabase" ):
    connection = sqlite3.connect( ":memory:" ) #https://geoinf25.github.io/site/Database/dbSqliteEs01.db
  else:
    connection.close()

idStudente = 0 #incr
idClasse = 0 #incr
nome = [ 'Alessandro', 'Marco', 'Michele', 'Rolando', 'Chiara', 'Francesca', 'Fernanda', 'Giulia', 'Alberto', 'Daniele', 'Gianni', 'Paolo', 'Veronica', 'Margherita', 'Annalisa' ]
cognome = [ "Veroli", "Bertoldi", "D'Addetta", "Del Fabbro", "Malfer", "Bassetti", "Ferri", "Righi", "Calza", "Viola", "Rossi", "Neri", "Bianchi", "Bettoni", "Flessati" ]
#eta randint(18, 45) limite incluso
luogoNascita = [ "Arco", "Riva del Garda", "Malcesine", "Torbole", "Nago", "Trento", "Rovereto", "Limone", "Ala", "Storo" ]
superficie = [ 25, 30, 35, 40, 45, 50, 70, 100 ]
piano = [ -1, 0, 1, 2, 3, 4, 5 ]
tipo = [ "Aula", "Laboratorio", "Palestra" ]
  
def tablePopulating( *args ):
  totRowsTabStudent = int( document.getElementById( "totRowsTabStudent" ).value )
  totRowsTabClass = int( document.getElementById( "totRowsTabClass" ).value )
  #connection = sqlite3.connect( ":memory:" ) #https://geoinf25.github.io/site/Database/dbSqliteEs01.db
  print("connection.total_changes: " + str( connection.total_changes ) )
  cursor = connection.cursor()

  cursor.execute("DROP TABLE IF EXISTS Studente");
  cursor.execute("DROP TABLE IF EXISTS Classe");

  cursor.execute("CREATE TABLE IF NOT EXISTS Studente (idStudente INTEGER, nome TEXT, cognome TEXT, eta INTEGER, luogoNascita TEXT )")
  cursor.execute("CREATE TABLE IF NOT EXISTS Classe (idClasse INTEGER, superficie INTEGER, piano INTEGER, tipo TEXT, idStudente INTEGER )")

  idStudente = 0
  idClasse = 0

  #print( nome[ randint(0, len(nome)-1) ] )

  for i in range(0, totRowsTabStudent, 1): #limite escluso 
    cursor.execute("INSERT INTO Studente VALUES ( ?, ?, ?, ?, ? )", ( 
      idStudente, nome[ randint(0, len(nome)-1) ], 
      cognome[ randint(0, len(cognome)-1) ], 
      randint(18, 45), 
      luogoNascita[ randint(0, len(luogoNascita)-1) ] 
    ))
    idStudente = idStudente + 1

  for i in range(0, totRowsTabClass, 1): #limite escluso 
    cursor.execute("INSERT INTO Classe VALUES ( ?, ?, ?, ?, ? )", ( 
      idClasse, 
      superficie[ randint(0, len(superficie)-1) ], 
      piano[ randint(0, len(piano)-1) ], 
      tipo[ randint(0, len(tipo)-1) ], 
      randint(0, totRowsTabStudent) 
    ))
    idClasse = idClasse + 1

  connection.commit()

  cursor.execute( "SELECT * FROM Studente" )
  tempResultQuerySQL = from_db_cursor(cursor)
  document.getElementById("txt_displayTabStudentDbEs01").innerHTML = tempResultQuerySQL.get_string()

  cursor.execute( "SELECT * FROM Classe" )
  tempResultQuerySQL = from_db_cursor(cursor)
  document.getElementById("txt_displayTabClassDbEs01").innerHTML = tempResultQuerySQL.get_string()

  #connection.close()
  print( "-- Fine valorizzazione Tabelle -- " )

def executeQuerySQL( *args ):
  #print( document.getElementById("txt_displayQuerySQLDbEs01").value )
  #connection = sqlite3.connect( ":memory:" ) #https://geoinf25.github.io/site/Database/dbSqliteEs01.db
  cursor = connection.cursor()
  cursor.execute( document.getElementById("txt_displayQuerySQLDbEs01").value )
  tempResultQuerySQL = from_db_cursor(cursor)
  document.getElementById("txt_displayResultDbEs01").innerHTML = tempResultQuerySQL.get_string()
  #connection.close()
  print( "-- Fine Esecuzione Query SQL -- " )

#Test iniziale all'apertura della Pagina Web
#if( window.sessionStorage.getItem( "superatoPrimoAvvio2" ) is None ):
#document.getElementById("btn_tablePopulating").click(); 
#window.sessionStorage.setItem( "superatoPrimoAvvio2" , 1 ) 

document.getElementById("txt_displayQuerySQLDbEs01").innerHTML = "select * from Classe where tipo = 'Aula' ";
