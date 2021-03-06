const express = require('express');
const router = express.Router();
const mysql = require('../db/conexao').pool;

//RETORNA TODOS OS PEDIDOS
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ status: "Error", erro: error }) }

        conn.query(
            `SELECT *
            FROM pedidos 
      INNER JOIN produtos
              ON produtos.id_produto = pedidos.id_produto;`,
            (error, result, fields) => {
                if(error) { return res.status(500).send({ status: "Error", erro: error }) }
                const response = {
                    status: 'Sucesso',
                    pedidos: result.map( pedido => {
                        return {
                            id_pedido: pedido.id_pedido,
                            quantidade: pedido.quantidade,
                            produto: {
                                id_produto: pedido.id_produto,
                                nome: pedido.nome,
                                type: pedido.type,
                                preco: pedido.preco
                            },
                            request: {
                                type: 'GET',
                                description: 'Retorna detalhes de um pedido especifico',
                                url: 'http://localhost:3000/pedidos/' + pedido.id_pedido
                            }
                        }
                    })
                }
                return res.status(200).send( response );
            }
        )
    });
});

// RETORNA PEDIDO EXPECIFICO
router.get('/:id_pedido', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ status: "Error", erro: error }) }

        conn.query(
            'SELECT * FROM pedidos WHERE id_pedido = ?;',
            [req.params.id_pedido],
            (error, result, fields) => {
                if(error) { return res.status(500).send({ status: "Error", erro: error }) }

                if(result.length == 0) {
                    return res.status(404).send({
                        status: "Error",
                        msg: 'Pedido não encontrado'
                    });
                }
                const response = {
                    status: 'Sucesso',
                    produto: {
                        id_pedido: result[0].id_pedido,
                        id_produto: result[0].id_produto,
                        quantidade: result[0].quantidade,
                        request: {
                            type: 'GET',
                            description: 'Retorna todos os pedidos',
                            url: 'http://localhost:3000/pedidos' 
                        }
                    }
                }
                return res.status(200).send( response );
            }
        )
    });
});

// INSERE O PEDIDO
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM produtos WHERE id_produto = ?', 
            [req.body.id_produto], 
            (error, result, field) => {
                if(error) { return res.status(500).send({ status: "Error", erro: error }) }
                if(result.length == 0) {
                    return res.status(404).send({
                        status: "Error",
                        msg: 'Produto não encontrado'
                    });
                }
                conn.query(
                    'INSERT INTO pedidos (id_produto, quantidade) VALUES (?,?)',
                    [req.body.id_produto, req.body.quantidade],
                    (error, result, field) => {
                        conn.release();
                        if(error) { return res.status(500).send({ status: "Error", erro: error }) }
                        
                        const response = {
                            status: 'Sucesso',
                            msg: 'Pedido feito com sucesso',
                            pedidoCriado: {
                                id_pedido: result.id_pedido,
                                id_produto: req.body.id_produto,
                                quantidade: req.body.quantidade,
                                request: {
                                    type: 'GET',
                                    description: 'Retorna todos os pedidos',
                                    url: 'http://localhost:3000/pedidos' 
                                }
                            }
                        }
                        return res.status(201).send( response );
                    }
                );
            })
    });
});

// DELETA O PEDIDO
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error) { return res.status(500).send({ status: "Error", erro: error }) }
        
        conn.query(
            `DELETE FROM pedidos WHERE id_pedido = ?`,
            [req.body.id_pedido],
            (error, result, field) => {
                conn.release();
                if(error) { return res.status(500).send({ status: "Error", erro: error }) }

                const response = {
                    status: 'Sucesso',
                    msg: 'Pedido cancelado com sucesso',
                    request: {
                        type: 'POST',
                        description: 'Fazer pedido',
                        url: 'http://localhost:3000/pedidos',
                        body: {
                            id_produto: 'number',
                            quantidade: 'number'
                        }
                    }
                }
                return res.status(202).send( response );
            }
        );
    });
});

module.exports = router;