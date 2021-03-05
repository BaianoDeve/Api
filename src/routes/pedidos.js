const express = require('express');
const router = express.Router();

//RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Pedidos GET",
        msg: "Usando GET dentro da rota pedidos"
    });
});

// RETORNA PRODUTO EXPECIFICO
router.get('/:id_pedidos', (req, res, next) => {

    const id = req.params.id_pedidos

    if(id === 'especial') {
        res.status(200).send({
            title: "Pedidos GET",
            id: id,
            msg: "Você decobriu o ID especial"
        });
    } else {
        res.status(200).send({
            title: "Pedidos GET",
            id: id,
            msg: "Você passou um id"
        });
    }
});

// INSERE O PRODUTO
router.post('/', (req, res, next) => {
    res.status(201).send({
        title: "Pedidos POST",
        msg: "Usando POST dentro da rota pedidos"
    });
});

// ATUALIZA O PRODUTO 
router.patch('/', (req, res, next) => {
    res.status(201).send({
        title: "Pedidos PATCH",
        msg: "Usando PATCH dentro da rota pedidos"
    });
});

// DELETA O PRODUTO
router.delete('/', (req, res, next) => {
    res.status(201).send({
        title: "Pedidos DELETE",
        msg: "Usando DELETE dentro da rota pedidos"
    });
});

module.exports = router;