
function elaboraMatriceAHP() {
	
	criteriPV = []; 
	
	var n = parseFloat( array_punteggioAHP.length, 10); //4.0
	
	var array_RI = [ 0.0, 0.0, 0.58, 0.90, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49, 1.51, 1.48, 1.56, 1.57, 1.59 ]; 
	
	for( var riga = 0; riga < array_punteggioAHP.length; riga++ ) {	
		for( var colonna = 0; colonna < array_punteggioAHP[ riga ].length; colonna++ ) {
			if( isNaN( array_punteggioAHP[ riga ][ colonna ] ) ) {
				print2("Comparison Matrix not completely filled out; operation terminated."); 
				return; 		
			}
		}
	}
	
	print2("Comparison Matrix: "); 
	var valoriMatrice = ""; 
	for( var riga = 0; riga < array_punteggioAHP.length; riga++ ) {	
		for( var colonna = 0; colonna < array_punteggioAHP[ riga ].length; colonna++ ) {
			valoriMatrice = valoriMatrice + array_punteggioAHP[ riga ][ colonna ].toFixed(6) + "\t"; 		
		}
		valoriMatrice = valoriMatrice + "\n"; 
	}
	
	print2( valoriMatrice ); 
	
	var Ti = [];
	var sommatoriaColonnaTemp = 0.0; 
	for( var colonna = 0; colonna < array_punteggioAHP[ 0 ].length; colonna++ ) {	
		sommatoriaColonnaTemp = 0.0; 
		for( var riga = 0; riga < array_punteggioAHP.length; riga++ ) {
			sommatoriaColonnaTemp = sommatoriaColonnaTemp + array_punteggioAHP[ riga ][ colonna ]; 
		}
		Ti.push( sommatoriaColonnaTemp ); 
	}
	print2( "Ti Array (column sums): " + Ti ); 
	
	var Xi = [];
	var sommatoriaRiga = 0.0; 
	var prodottoRiga = 1.0;
	var sommatoriaColonnaXi = 0.0; 
	
	if( tipologiaMediaMatriceAHP == "aritmetica" ) {
		
		for( var riga = 0; riga < array_punteggioAHP.length; riga++ ) {	
			sommatoriaRiga = 0.0; 
			for( var colonna = 0; colonna < array_punteggioAHP[ riga ].length; colonna++ ) {
				sommatoriaRiga = sommatoriaRiga + array_punteggioAHP[ riga ][ colonna ]; 		
			}
			Xi.push( sommatoriaRiga / n ); 
			sommatoriaColonnaXi = sommatoriaColonnaXi + Xi[ riga ]; 
		}
				
	} else if( tipologiaMediaMatriceAHP == "geometrica" ) {
		
		for( var riga = 0; riga < array_punteggioAHP.length; riga++ ) {	
			prodottoRiga = 1.0; 
			for( var colonna = 0; colonna < array_punteggioAHP[ riga ].length; colonna++ ) {
				prodottoRiga = prodottoRiga * array_punteggioAHP[ riga ][ colonna ]; 		
			}
			Xi.push( Math.pow( prodottoRiga, 1.0/n ) ); 
			sommatoriaColonnaXi = sommatoriaColonnaXi + Xi[ riga ]; 
		}
		
	}
	print2("Xi Array (arithmetic / geometric mean relating to the product obtained from the values contained in each single row): " + Xi ); 
	
	//Array criteriPV o Pi
	for( var riga = 0; riga < array_punteggioAHP.length; riga++ ) {	
		//for( var colonna = 0; colonna < array_punteggioAHP[ riga ].length; colonna++ ) {
			//		
		//}
		criteriPV.push( ( Xi[ riga ] / sommatoriaColonnaXi ) ); 
	}
	print2("Pi Array or Priority Vector of the criteria (weights assumed by each criterion): " + criteriPV );
	
	//Verifica autovalore principale
	var Yi=[]; 
	for( var riga = 0; riga < array_punteggioAHP.length; riga++ ) {	
		//for( var colonna = 0; colonna < array_punteggioAHP[ riga ].length; colonna++ ) {
			//		
		//}
		//Yi.push( parseFloat( ( Xi[ riga ] / sommatoriaColonnaXi * Ti[ riga ] ), 10  ) ); //Matrice quadrata riga = colonna
		Yi.push( parseFloat( ( criteriPV[ riga ] * Ti[ riga ] ), 10  ) ); //Matrice quadrata riga = colonna
	}
	print2("Yi Array (components of the principal eigenvalue): " + Yi );
	
	var autovalorePrincipale = 0.0; 
	for( var riga = 0; riga < array_punteggioAHP.length; riga++ ) {	
		//for( var colonna = 0; colonna < array_punteggioAHP[ riga ].length; colonna++ ) {
			//		
		//}
		autovalorePrincipale = autovalorePrincipale + Yi[ riga ]; 
	}
	
	print2("Principal / Maximum eigenvalue (Lambda): " + autovalorePrincipale.toFixed(6) ); 
	
	var differenza = autovalorePrincipale - n; 
	if( Math.abs( differenza ) > 0.0 && Math.abs( differenza ) < 0.0000009999 ) {
		print2( "Principal_eigenvalue - n = " + differenza + " (without approximations)" ); 
		differenza = 0.0; 
	} else {
		//
	}
	
	var CI = differenza / ( n - 1 ); 
	print2("CI or Consistency Index : " + CI.toFixed(6) ); 
	
	var RI = array_RI[ n - 1 ]; 
	print2("RI or Random Index: " + RI.toFixed(6) ); 
	
	CR = CI / RI; 
	print2("CR or Consistency Ratio: " + CR.toFixed(6) ); 
	
	if( CR <= 0.1 ) {
		print2(
			"CR index included within the CR threshold value considered equal to 0.1"
		); 
		print2( 
			"Dist Weight: " + criteriPV[ 0 ].toFixed(6) + "\n" +
			"Catt Weight: " + criteriPV[ 1 ].toFixed(6) + "\n" +
			"Ctot Weight: " + criteriPV[ 2 ].toFixed(6) + "\n" +
			"ImpIct Weight: " + criteriPV[ 3 ].toFixed(6) 
		);
		
	} else {
		print2(
			"CR index higher than the limit threshold of 0.1."
		); 	
	} 
	
}

