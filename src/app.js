const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.status(200).send({
        title: 'Node API',
        msg: 'Ok, está funcionado'
    });
});

module.exports = app;