const express = require('express')
const path = require('path');

const app = express();
const PORT = 3000;

var user = null;

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/sugestao', (req, res) => {
    const { nome, ingredientes } = req.query;

    if(!nome) {
        res.redirect('/not-found');       
    }

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Agradecimento</title>
            <link rel="stylesheet" href="css/style.css">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Winky+Rough:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
        </head>
        <body>
            <div class="cardAgradecimento">
                <h2>Obrigado pela sugestão, ${nome}! </h2>
                <p>Os ingredientes ${ingredientes} serão avaliados! </p>
            </div>
            <a href="/">Página Inicial</a>
        </body>
        </html>`
    );
});

app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/contato.html'));
});

app.post('/contato', (req, res) => {
    user = req.body;

    res.redirect('/contato-recebido');
});

app.get('/contato-recebido', (req, res) => {
    if(!user) {
        res.redirect('/not-found');
    }
    
    const { nome, email, assunto, mensagem } = user

    res.status(200).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Agradecimento</title>
            <link rel="stylesheet" href="css/style.css">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Winky+Rough:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
        </head>
        <body>
            <div class="cardAgradecimento">
                <h2>Obrigado pelo contato, ${nome}.</h2>
                <p>Email: ${email}</p>
                <p>Assunto: ${assunto}.</p>
                <p>Mensagem: ${mensagem}.</p>
            </div>
            <a href="/">Página Inicial</a>
        </body>
        </html>`
    );
})

app.get('/api/lanches', (req, res) => {
    const listaLanches = [];   
    const lanches = require('./public/data/lanches.json');

    while(listaLanches.length !== 3){
        let indexAleatorio = Math.floor(Math.random() * lanches.length);

        if(!listaLanches.includes(lanches[indexAleatorio]))
            listaLanches.push(lanches[indexAleatorio]);
    }
    
    res.json(listaLanches);
});

app.get('/not-found', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public/404.html'));
})

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});