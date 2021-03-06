const express = require('express');
const router = express.Router();
const mysql = require('../db/conexao').pool;

//RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ status: "Error", erro: error }) }

        conn.query(
            'SELECT * FROM produtos;',
            (error, resultado, fields) => {
                if(error) { return res.status(500).send({ status: "Error", erro: error }) }
                return res.status(200).send({ status: "Sucesso", Produtos: resultado });
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
            (error, resultado, fields) => {
                if(error) { return res.status(500).send({ status: "Error", erro: error }) }
                return res.status(200).send({ status: "Sucesso", Produtos: resultado });
            }
        )
    });
});

// INSERE O PRODUTO
router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) =>{
        if(error) { return res.status(500).send({ status: "Error", erro: error }) }
        
        conn.query(
            'INSERT INTO produtos (nome, preco, type) VALUES (?,?,?)',
            [req.body.nome, req.body.preco, req.body.type],
            (error, resultado, field) => {
                conn.release();
                if(error) { return res.status(500).send({ status: "Error", erro: error }) }

                res.status(201).send({
                    status: 'Sucesso',
                    msg: 'Produto inserido com sucesso',
                    id_produto: resultado.insertId
                });
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
            (error, resultado, field) => {
                conn.release();
                if(error) { return res.status(500).send({ status: "Error", erro: error }) }

                res.status(202).send({
                    status: 'Sucesso',
                    msg: 'Produto inserido com sucesso',
                });
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
            (error, resultado, field) => {
                conn.release();
                if(error) { return res.status(500).send({ status: "Error", erro: error }) }

                res.status(202).send({
                    status: 'Sucesso',
                    msg: 'Produto removido com sucesso',
                });
            }
        );
    });
});

module.exports = router;