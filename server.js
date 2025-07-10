const express = require('express')
const path = require('path');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/sugestao', (req, res) => {
    const { nome, ingredientes }= req.query;
    console.log(nome, ingredientes);

    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Agradecimento</title>
    </head>
    <body>
        <p>Obrigado pela sugestão ${nome}! </p>
        <p>Os ingredientes ${ingredientes} serão avaliados! </p>
    </body>
    </html>`);
});

app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/contato.html'));
});

app.post('/contato', (req, res) => {
    const { nome, email, assunto, mensagem } = req.query;
    console.log(nome, email, assunto, mensagem)

    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Agradecimento</title>
    </head>
    <body>
        <h1> Seja Bem Vindo, ${nome}! </h1>
        <p>Email: ${email}! </p>
        <p>Assunto: ${assunto}! </p>
        <p>Mensagem: ${mensagem}! </p>
    </body>
    </html>`);
});

app.get('/api/lanches', (req, res) => {
    res.send("Hello")
});

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});