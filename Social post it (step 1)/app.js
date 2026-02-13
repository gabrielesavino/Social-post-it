// Importo express
const express = require('express');
const fs = require('fs');

// Creo l'applicazione
const app = express();

// Middleware per leggere i dati del form
app.use(express.urlencoded({ extended: true }));

// Renderizza la pagina post al percorso /post
app.get('/post', (req, res) => {
  res.send(`
    <html>
    <body>
      <h1>Form</h1>
      <form method="POST" action="/post">
        <input type="text" name="testo">
        <button>Invia</button>
      </form>
    </body>
    </html>
  `);
});

// Salva i dati nel file post.json
app.post('/post', (req, res) => {
  // Leggo il file
  let dati = [];
  if (fs.existsSync('post.json')) {
    dati = JSON.parse(fs.readFileSync('post.json'));
  }
  
  // Aggiungo il nuovo dato
  dati.push(req.body.testo);
  
  // Salvo nel file
  fs.writeFileSync('post.json', JSON.stringify(dati));
  
  res.send('Salvato! <a href="/post">Torna</a>');
});

// Server sulla porta 3000
app.listen(3000, () => {
  console.log('Server su porta 3000');
});
