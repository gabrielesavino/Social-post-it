// Importo express
const express = require('express');
const fs = require('fs');
const multer = require('multer');

const app = express();

// Dico a Express di usare EJS
app.set('view engine', 'ejs');

// Middleware per leggere i dati del form
app.use(express.urlencoded({ extended: true }));

// Cartella pubblica per le immagini
app.use('/uploads', express.static('uploads'));

// Configuro Multer (per caricare immagini)
const upload = multer({ 
  dest: 'uploads/' 
});

// ROUTE: Mostra il form
app.get('/post', (req, res) => {
  res.render('post');
});

// ROUTE: Salva il post
app.post('/post', upload.single('immagine'), (req, res) => {
  // Leggo file JSON
  let posts = [];
  if (fs.existsSync('post.json')) {
    posts = JSON.parse(fs.readFileSync('post.json'));
  }
  
  // Creo nuovo post
  const nuovoPost = {
    id: Date.now(),
    titolo: req.body.titolo,
    descrizione: req.body.descrizione,
    immagine: '/uploads/' + req.file.filename,
    nomeFile: req.file.originalname
  };
  
  // Aggiungo e salvo
  posts.push(nuovoPost);
  fs.writeFileSync('post.json', JSON.stringify(posts, null, 2));
  
  res.redirect('/gallery');
});

// ROUTE: Mostra gallery
app.get('/gallery', (req, res) => {
  let posts = [];
  if (fs.existsSync('post.json')) {
    posts = JSON.parse(fs.readFileSync('post.json'));
  }
  res.render('gallery', { posts: posts });
});

// ROUTE: Mostra singolo post
app.get('/post/:id', (req, res) => {
  let posts = [];
  if (fs.existsSync('post.json')) {
    posts = JSON.parse(fs.readFileSync('post.json'));
  }
  const post = posts.find(p => p.id == req.params.id);
  res.render('dettaglio', { post: post });
});

// Avvio server
app.listen(3000, () => {
  console.log('Server su porta 3000');
  console.log('Apri: http://localhost:3000/post');
});
