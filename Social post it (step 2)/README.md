# Step 2 - Gallery con Upload Immagini

## Installazione
```bash
npm install
```

## Avvio
```bash
node app.js
```

## Percorsi
- `/post` - Crea nuovo post
- `/gallery` - Vedi tutti i post
- `/post/:id` - Dettaglio post

## Struttura
```
step-2/
├── app.js           # Server Express
├── package.json     # Dipendenze
├── post.json        # Database JSON
├── views/           # Template EJS
│   ├── post.ejs
│   ├── gallery.ejs
│   └── dettaglio.ejs
└── uploads/         # Immagini (si crea automaticamente)
```

## Funzionalità
- ✅ Form con titolo, descrizione, immagine
- ✅ Upload immagini con Multer
- ✅ Salvataggio dati in JSON
- ✅ Gallery responsive (3/2/1 colonne)
- ✅ Click su immagine per dettaglio
- ✅ Template EJS

## Dipendenze
- express: Server web
- ejs: Template engine
- multer: Upload file
