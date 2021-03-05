const express = require('express');
const app = express();

const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');
const rotaUsuarios = require('./routes/usuarios');

app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);
app.use('/usuarios', rotaUsuarios);

app.use((req, res, next) => {
    res.status(200).send({
        title: 'Node API',
        msg: 'Ok, está funcionado'
    });
});

module.exports = app;