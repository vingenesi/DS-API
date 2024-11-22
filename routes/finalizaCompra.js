const express = require("express");
const router = express.Router();

const {
  finalizaCompra
} = require("../controllers/finalizaCompra/finalizaCompra");

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Operações relacionadas ao cadastro de usuários e dados associados
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário com endereço e dados de pagamento
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome completo do usuário
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do usuário
 *                 example: usuario@example.com
 *               cpf:
 *                 type: string
 *                 description: CPF do usuário
 *                 example: 123.456.789-00
 *               fone:
 *                 type: string
 *                 description: Número de telefone do usuário
 *                 example: 11987654321
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *                 example: senha123
 *               rua:
 *                 type: string
 *                 description: Rua do endereço do usuário
 *                 example: Rua das Flores
 *               bairro:
 *                 type: string
 *                 description: Bairro do endereço do usuário
 *                 example: Centro
 *               cidade:
 *                 type: string
 *                 description: Cidade do endereço do usuário
 *                 example: São Paulo
 *               cep:
 *                 type: string
 *                 description: CEP do endereço do usuário
 *                 example: 12345-678
 *               complemento:
 *                 type: string
 *                 description: Complemento do endereço
 *                 example: Apto 101
 *               payment_method:
 *                 type: string
 *                 description: Método de pagamento do usuário
 *                 example: Cartão de Crédito
 *               card_number:
 *                 type: string
 *                 description: Número do cartão de crédito
 *                 example: 4111 1111 1111 1111
 *               nome_no_cartao:
 *                 type: string
 *                 description: Nome impresso no cartão
 *                 example: João Silva
 *               expiration_date:
 *                 type: string
 *                 description: Data de validade do cartão (MM/AA)
 *                 example: 12/25
 *               cvv:
 *                 type: string
 *                 description: Código de segurança (CVV) do cartão
 *                 example: 123
 *     responses:
 *       201:
 *         description: Usuário, endereço e cartão criados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID do usuário
 *                       example: 1
 *                     name:
 *                       type: string
 *                       description: Nome do usuário
 *                       example: João Silva
 *                     email:
 *                       type: string
 *                       description: Email do usuário
 *                       example: usuario@example.com
 *                 address:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID do endereço
 *                       example: 1
 *                     rua:
 *                       type: string
 *                       description: Rua do endereço
 *                       example: Rua das Flores
 *                     bairro:
 *                       type: string
 *                       description: Bairro do endereço
 *                       example: Centro
 *                     cidade:
 *                       type: string
 *                       description: Cidade do endereço
 *                       example: São Paulo
 *                     cep:
 *                       type: string
 *                       description: CEP do endereço
 *                       example: 12345-678
 *                     complemento:
 *                       type: string
 *                       description: Complemento do endereço
 *                       example: Apto 101
 *                 card:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID do cartão de crédito
 *                       example: 1
 *                     payment_method:
 *                       type: string
 *                       description: Método de pagamento
 *                       example: Cartão de Crédito
 *                     card_number:
 *                       type: string
 *                       description: Número do cartão
 *                       example: 4111 1111 1111 1111
 *                     nome_no_cartao:
 *                       type: string
 *                       description: Nome impresso no cartão
 *                       example: João Silva
 *                     expiration_date:
 *                       type: string
 *                       description: Data de validade do cartão
 *                       example: 12/25
 *                     cvv:
 *                       type: string
 *                       description: Código de segurança do cartão
 *                       example: 123
 *       400:
 *         description: Erro de validação de dados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: Dados inválidos fornecidos.
 *       500:
 *         description: Erro no servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: Ocorreu um erro ao processar a requisição.
 */
router.post("/", finalizaCompra);

module.exports = router;
