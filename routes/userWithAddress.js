const {
  createUserWithAddress
} = require("../controllers/userWithAddress/createUserWithAddress");

const {
  getUserWithAddresses
} = require("../controllers/userWithAddress/getUserWithAddresses");
const authenticateToken = require("../middleware/authenticateToken");

var express = require("express");
var router = express.Router();

/**
 * @swagger
 * /users/with-address:
 *   post:
 *     summary: Cria um novo usuário com endereço
 *     description: Cria um novo usuário e associa um endereço a ele.
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - rua
 *               - bairro
 *               - cidade
 *               - cep
 *               - complemento
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
 *                 description: Rua do endereço
 *                 example: Rua dos Três Irmãos
 *               bairro:
 *                 type: string
 *                 description: Bairro do endereço
 *                 example: Jardim Paulista
 *               cidade:
 *                 type: string
 *                 description: Cidade do endereço
 *                 example: São Paulo
 *               cep:
 *                 type: string
 *                 description: CEP do endereço
 *                 example: 01234-567
 *               complemento:
 *                 type: string
 *                 description: Complemento do endereço
 *                 example: Bloco A, Apartamento 101
 *     responses:
 *       201:
 *         description: Usuário e endereço criados com sucesso
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
 *                       description: ID do usuário criado
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
 *                       description: ID do endereço associado
 *                       example: 1
 *                     rua:
 *                       type: string
 *                       description: Rua do endereço
 *                       example: Rua dos Três Irmãos
 *                     bairro:
 *                       type: string
 *                       description: Bairro do endereço
 *                       example: Jardim Paulista
 *                     cidade:
 *                       type: string
 *                       description: Cidade do endereço
 *                       example: São Paulo
 *                     cep:
 *                       type: string
 *                       description: CEP do endereço
 *                       example: 01234-567
 *                     complemento:
 *                       type: string
 *                       description: Complemento do endereço
 *                       example: Bloco A, Apartamento 101
 *       400:
 *         description: Dados obrigatórios faltando ou inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Detalhes sobre o erro
 *                   example: "Todos os dados são obrigatórios."
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Detalhes sobre o erro
 *                   example: "Erro interno no servidor."
 */
router.post("/", createUserWithAddress);

/**
 * @swagger
 * /users/{id}/addresses:
 *   get:
 *     summary: Recupera um usuário com seus endereços
 *     description: Busca um usuário pelo ID e retorna as informações do usuário juntamente com seus endereços.
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário para buscar
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Usuário e endereços encontrados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do usuário
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: Nome do usuário
 *                   example: João Silva
 *                 email:
 *                   type: string
 *                   description: Email do usuário
 *                   example: usuario@example.com
 *                 Addresses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID do endereço
 *                         example: 1
 *                       rua:
 *                         type: string
 *                         description: Rua do endereço
 *                         example: Rua dos Três Irmãos
 *                       bairro:
 *                         type: string
 *                         description: Bairro do endereço
 *                         example: Jardim Paulista
 *                       cidade:
 *                         type: string
 *                         description: Cidade do endereço
 *                         example: São Paulo
 *                       cep:
 *                         type: string
 *                         description: CEP do endereço
 *                         example: 01234-567
 *                       complemento:
 *                         type: string
 *                         description: Complemento do endereço
 *                         example: Bloco A, Apartamento 101
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Detalhes sobre o erro
 *                   example: "Usuário não encontrado."
 *       500:
 *         description: Erro interno ao buscar usuário com endereços
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Detalhes sobre o erro
 *                   example: "Erro ao buscar usuário com endereços."
 */
router.get("/:id", getUserWithAddresses);

module.exports = router;
