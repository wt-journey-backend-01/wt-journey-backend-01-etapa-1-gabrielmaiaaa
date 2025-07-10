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
        <p>Os ingrdientes ${ingredientes} serão avaliados!
    </body>
    </html>`);
});

app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/contato.html'));
});

app.post('/contato', (req, res) => {
    const dadosCliente = req.query;
    console.log(dadosCliente)
});

app.get('/api/lanches', (req, res) => {
});

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});