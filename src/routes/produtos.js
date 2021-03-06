const express = require('express');
const router = express.Router();
const mysql = require('../db/conexao').pool;
const multer = require('multer');
const upload = multer({ dest: 'upload/' })

//RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ status: "Error", erro: error }) }

        conn.query(
            'SELECT * FROM produtos;',
            (error, result, fields) => {
                if(error) { return res.status(500).send({ status: "Error", erro: error }) }
                const response = {
                    status: 'Sucesso',
                    quantidade: result.length,
                    produtos: result.map(prod => {
                        return {
                            id_produto: prod.id_produto,
                            nome: prod.nome,
                            type: prod.type,
                            preco: prod.preco,
                            request: {
                                type: 'GET',
                                description: 'Retorna detalhes de um produto',
                                url: 'http://localhost:3000/produtos/' + prod.id_produto
                            }
                        }
                    })
                }
                return res.status(200).send( response );
            }
        )
    });
    
});

// RETORNA PRODUTO EXPECIFICO
router.get('/:id_produto', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ status: "Error", erro: error }) }

        conn.query(
            'SELECT * FROM produtos WHERE id_produto = ?;',
            [req.params.id_produto],
            (error, result, fields) => {
                if(error) { return res.status(500).send({ status: "Error", erro: error }) }

                if(result.length == 0) {
                    return res.status(404).send({
                        status: "Error",
                        msg: 'Produto não encontrado'
                    });
                }
                const response = {
                    status: 'Sucesso',
                    produto: {
                        id_produto: result[0].id_produto,
                        nome: result[0].nome,
                        type: result[0].type,
                        preco: result[0].preco,
                        request: {
                            type: 'GET',
                            description: 'Retorna todos os produtos',
                            url: 'http://localhost:3000/produtos' 
                        }
                    }
                }
                return res.status(200).send( response );
            }
        )
    });
});

// INSERE O PRODUTO
router.post('/', upload.single('produto_imagem'), (req, res, next) => {

    console.log(req.file);

    mysql.getConnection((error, conn) =>{
        if(error) { return res.status(500).send({ status: "Error", erro: error }) }
        
        conn.query(
            'INSERT INTO produtos (nome, preco, type) VALUES (?,?,?)',
            [req.body.nome, req.body.preco, req.body.type],
            (error, result, field) => {
                conn.release();
                if(error) { return res.status(500).send({ status: "Error", erro: error }) }
                const response = {
                    status: 'Sucesso',
                    msg: 'Produto criado com sucesso',
                    produtoCriado: {
                        id_produto: result.id_produto,
                        nome: req.body.nome,
                        type: req.body.type,
                        preco: req.body.preco,
                        request: {
                            type: 'GET',
                            description: 'Retorna todos os produtos',
                            url: 'http://localhost:3000/produtos' 
                        }
                    }
                }
                return res.status(201).send( response );
            }
        );
    });
    
});

// ATUALIZA O PRODUTO 
router.patch('/', (req, res, next) => {

    mysql.getConnection((error, conn) =>{
        if(error) { return res.status(500).send({ status: "Error", erro: error }) }
        
        conn.query(
            `UPDATE produtos
                SET nome    = ?,
                    preco   = ?,
                    type  = ?
              WHERE id_produto = ?`,
            [
                req.body.nome, 
                req.body.preco, 
                req.body.type,
                req.body.id_produto
            ],
            (error, result, field) => {
                conn.release();
                if(error) { return res.status(500).send({ status: "Error", erro: error }) }

                const response = {
                    status: 'Sucesso',
                    msg: 'Produto atualizado com sucesso',
                    produtoAtualizado: {
                        id_produto: req.body.id_produto,
                        nome: req.body.nome,
                        type: req.body.type,
                        preco: req.body.preco,
                        request: {
                            type: 'GET',
                            description: 'Retorna detalhes de um produto',
                            url: 'http://localhost:3000/produtos/' + req.body.id_produto
                        }
                    }
                }
                return res.status(202).send( response );
            }
        );
    });
});

// DELETA O PRODUTO
router.delete('/', (req, res, next) => {

    mysql.getConnection((error, conn) =>{
        if(error) { return res.status(500).send({ status: "Error", erro: error }) }
        
        conn.query(
            `DELETE FROM produtos WHERE id_produto = ?`,
            [req.body.id_produto],
            (error, result, field) => {
                conn.release();
                if(error) { return res.status(500).send({ status: "Error", erro: error }) }

                const response = {
                    status: 'Sucesso',
                    msg: 'Produto removido com sucesso',
                    request: {
                        type: 'POST',
                        description: 'Insere produto',
                        url: 'http://localhost:3000/produtos',
                        body: {
                            nome: 'string',
                            type: 'string',
                            preco: 'number'
                        }
                    }
                }
                return res.status(202).send( response );
            }
        );
    });
});

module.exports = router;