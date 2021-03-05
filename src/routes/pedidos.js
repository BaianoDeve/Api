const express = require('express');
const router = express.Router();

//RETORNA TODOS OS PEDIDOS
router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Pedidos GET",
        msg: "Listar todos os Pedidos"
    });
});

// RETORNA PEDIDO EXPECIFICO
router.get('/:id_pedidos', (req, res, next) => {

    const id = req.params.id_pedidos

    res.status(200).send({
        title: "Pedidos GET",
        id: id,
        msg: "Listar pedido expecifico"
    });
});

// INSERE O PEDIDO
router.post('/', (req, res, next) => {
    res.status(201).send({
        title: "Pedidos POST",
        msg: "Fazer pedido"
    });
});

// DELETA O PEDIDO
router.delete('/:id_pedido', (req, res, next) => {
    res.status(201).send({
        title: "Pedidos DELETE",
        msg: "Deletar pedido"
    });
});

module.exports = router;