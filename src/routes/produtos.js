const express = require('express');
const router = express.Router();

//RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Produtos GET",
        msg: "Usando GET dentro da rota produtos"
    });
});

// RETORNA PRODUTO EXPECIFICO
router.get('/:id_produto', (req, res, next) => {

    const id = req.params.id_produto

    if(id === 'especial') {
        res.status(200).send({
            title: "Produtos GET",
            id: id,
            msg: "Você decobriu o ID especial"
        });
    } else {
        res.status(200).send({
            title: "Produtos GET",
            id: id,
            msg: "Você passou um id"
        });
    }
});

// INSERE O PRODUTO
router.post('/', (req, res, next) => {
    res.status(201).send({
        title: "Produtos POST",
        msg: "Usando POST dentro da rota produtos"
    });
});

// ATUALIZA O PRODUTO 
router.patch('/', (req, res, next) => {
    res.status(201).send({
        title: "Produtos PATCH",
        msg: "Usando PATCH dentro da rota produtos"
    });
});

// DELETA O PRODUTO
router.delete('/', (req, res, next) => {
    res.status(201).send({
        title: "Produtos DELETE",
        msg: "Usando DELETE dentro da rota produtos"
    });
});

module.exports = router;