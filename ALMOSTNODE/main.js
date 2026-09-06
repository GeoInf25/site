
import { createContainer , getServerBridge  } from 'almostnode';

// 1. Inizializza il container Node.js nel browser
const container = createContainer();

//fs =  container.vfs. ... 
//const contenutoServer = container.vfs.readFileSync('/server.js', 'utf-8');

const response = await fetch('./server.js');
const codiceServer = await response.text();

// 2. Crea un file server virtuale (es. server.js) all'interno del file system virtuale
//container.vfs.writeFileSync('/server.js', ` codice js del Server ` ); //Vedi VIRGOLETTE

container.vfs.writeFileSync('/server.js', codiceServer );

// 3. Avvia il file appena creato dentro il container
await container.run('node /server.js');

// 4. ... onServerReady ... 
const bridge = getServerBridge();

export { bridge };

/*
import { createContainer } from 'almostnode';

async function run() {
  const container = createContainer();

  // 1. Scriviamo la logica del codice (senza metterlo in ascolto su porte fisiche)
  container.vfs.writeFileSync('/logic.js', `
    // Definiamo cosa deve rispondere il nostro finto server
    function handleRequest(path) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/html' },
        body: '<h1>Connesso alla porta!</h1><p>Risposta generata con successo.</p>'
      };
    }

    // Simuliamo la chiamata immediata e stampiamola nello stdout
    const risposta = handleRequest('/');
    console.log("==RISPOSTA_HTML==" + risposta.body + "==FINE_HTML==");
  `);

  // 2. Eseguiamo il file ed estraiamo direttamente il testo stampato
  const esecuzione = await container.run('node /logic.js');
  const output = esecuzione.stdout;

  // 3. Estraggo il testo HTML usando una Regex pulita
  const match = output.match(/==RISPOSTA_HTML==([\s\S]*?)==FINE_HTML==/);

  if (match && match[1]) {
    const htmlPulito = match[1];
    console.log("SUCCESSO! Ecco il tuo HTML estratto dal container:", htmlPulito);
    
    // Mostriamolo visivamente sullo schermo sostituendo il body o stampandolo
    document.body.innerHTML = htmlPulito;
  } else {
    console.error("Il container non ha sputato l'HTML atteso. Output grezzo:", output);
  }
}

run();
*/