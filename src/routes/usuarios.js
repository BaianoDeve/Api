const express = require('express');
const router = express.Router();

//RETORNA TODOS OS USUARIOS
router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Usuarios GET",
        msg: "Usando GET dentro da rota usuarios"
    });
});

// RETORNA USUARIO EXPECIFICO
router.get('/:id_usuario', (req, res, next) => {

    const id = req.params.id_usuario

    if(id === 'especial') {
        res.status(200).send({
            title: "Usuarios GET",
            id: id,
            msg: "Você decobriu o ID especial"
        });
    } else {
        res.status(200).send({
            title: "Usuarios GET",
            id: id,
            msg: "Você passou um id"
        });
    }
});

// INSERE O USUARIO
router.post('/', (req, res, next) => {
    res.status(201).send({
        title: "Usuarios POST",
        msg: "Usando POST dentro da rota usuarios"
    });
});

// ATUALIZA O USUARIO 
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