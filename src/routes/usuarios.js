const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'src/upload/' })

//RETORNA TODOS OS USUARIOS
router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Usuarios GET",
        msg: "listar todos usuarios"
    });
});

// RETORNA USUARIO EXPECIFICO
router.get('/:id_usuer', (req, res, next) => {

    const id = req.params.id_usuer

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
    const user = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    };

    res.status(201).send({
        title: "Usuarios POST",
        msg: "Cadastrar usuario",
        usuarioCriado: user
    });
});

// ATUALIZA O USUARIO 
router.patch('/:id_user', (req, res, next) => {

    const id = req.params.id_usuer

    res.status(201).send({
        id: id,
        title: "Usuarios PATCH",
        msg: "Atualizar usuario"
    });
});

// DELETA O USUARIO
router.delete('/:id_user', (req, res, next) => {

    const id = req.params.id_usuer

    res.status(201).send({
        id: id,
        title: "Usuarios DELETE",
        msg: "Deletar usuariop"
    });
});

module.exports = router;