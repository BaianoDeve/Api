const express = require('express');
const router = express.Router();

//RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Produtos GET",
        msg: "Listar todos os produtos"
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
    const produto = {
        nome: req.body.nome,
        preco: req.body.preco
    };

    res.status(201).send({
        title: "Produtos POST",
        msg: "Inserir produto",
        produtoCriado: produto
    });
});

// ATUALIZA O PRODUTO 
router.patch('/', (req, res, next) => {

    const id = req.params.id_produto

    res.status(201).send({
        id: id,
        title: "Produtos PATCH",
        msg: "Utualizar produto"
    });
});

// DELETA O PRODUTO
router.delete('/:id_produto', (req, res, next) => {

    const id = req.params.id_produto

    res.status(201).send({
        id: id,
        title: "Produtos DELETE",
        msg: "Deletar produto"
    });
});

module.exports = router;