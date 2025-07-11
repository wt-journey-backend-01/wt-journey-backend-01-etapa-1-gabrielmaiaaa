const express = require('express')
const path = require('path');

const app = express();
const PORT = 3000;

var user = {
    nome: '',
    email: '', 
    assunto: '', 
    mensagem: ''
}

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/sugestao', (req, res) => {
    const { nome, ingredientes }= req.query;

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Agradecimento</title>
        </head>
        <body>
            <p>Obrigado pela sugestão ${nome}! </p>
            <p>Os ingredientes ${ingredientes} serão avaliados! </p>
            <a href="/">Página Inicial</a>
        </body>
        </html>`
    );
});

app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/contato.html'));
});

app.post('/contato', (req, res) => {
    const { nome, email, assunto, mensagem } = req.body;
    user.nome = nome;
    user.email = email;
    user.assunto = assunto;
    user.mensagem = mensagem;

    res.redirect('/contato-recebido')
});

app.get('/contato-recebido', (req, res) => {

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Agradecimento</title>
        </head>
        <body>
            <h1>Nome: ${user.nome}! </h1>
            <p>Email: ${user.email}! </p>
            <p>Assunto: ${user.assunto}! </p>
            <p>Mensagem: ${user.mensagem}! </p>
        </body>
        </html>`
    );
})

app.get('/api/lanches', (req, res) => {
    const listaLanches = [];
    
    res.send("Hello");

});

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});