const {createUser} = require("../controllers/user/createUser");
const {deleteUser} = require("../controllers/user/deleteUser");
const {getAllUsers} = require("../controllers/user/getAllUsers");
const {getIdUser} = require("../controllers/user/getIdUser");
const {loginUser} = require("../controllers/user/loginUser");
const {getUserWithAddresses} = require("../controllers/user/getUserWithAddresses");

var express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
var router = express.Router();

/**
 * @swagger
 * tags:
 *   name: API Geração Tech
 *   description: Documentação de referência da API de demonstração para o trabalho final da geração Tech
 */

/**
 * @swagger
 * /users/{id}/addresses:
 *   get:
 *     summary: Retorna um usuário específico com seus endereços
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário e seus endereços encontrados com sucesso
 *       403:
 *         description: Acesso não autorizado
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao buscar usuário com endereços
 */
router.get("/:id/addresses", authenticateToken, getUserWithAddresses);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retorna um usuário específico pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao buscar usuário
 */
router.get("/:id", getIdUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Marca um usuário como inativo (exclusão lógica)
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso (marcado como inativo)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário excluído com sucesso."
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Usuário não encontrado."
 *       400:
 *         description: Falha ao excluir usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Falha ao excluir usuário."
 *       500:
 *         description: Erro interno ao excluir usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Falha ao excluir usuário."
 */
router.put("/:id", deleteUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna uma lista de todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Nome do usuário
 *                     example: João Silva
 *                   email:
 *                     type: string
 *                     format: email
 *                     description: Email do usuário
 *                     example: usuario@example.com
 *                   cpf:
 *                     type: string
 *                     description: CPF do usuário
 *                     example: "123.456.789-00"
 *                   fone:
 *                     type: string
 *                     description: Telefone do usuário
 *                     example: "+5511999999999"
 *                   active:
 *                     type: boolean
 *                     description: Status de atividade do usuário
 *                     example: true
 *       500:
 *         description: Erro interno ao buscar usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao buscar usuários"
 *                 details:
 *                   type: string
 *                   example: "Detalhes do erro interno."
 */
router.get("/", getAllUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
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
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do usuário
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do usuário
 *                 example: usuario@example.com
 *               cpf:
 *                 type: string
 *                 description: CPF do usuário
 *                 example: "123.456.789-00"
 *               fone:
 *                 type: string
 *                 description: Telefone do usuário
 *                 example: "+5511999999999"
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *                 example: senha123
 * 
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 createUser:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: João Silva
 *                     email:
 *                       type: string
 *                       example: usuario@example.com
 *                     cpf:
 *                       type: string
 *                       example: "123.456.789-00"
 *                     fone:
 *                       type: string
 *                       example: "+5511999999999"
 *                 registrationToken:
 *                   type: string
 *                   example: "token_de_registro_gerado"
 *       400:
 *         description: Requisição inválida (dados obrigatórios ausentes ou email em formato incorreto)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Nome, email e senha são obrigatórios."
 *       409:
 *         description: Conflito (email ou CPF já cadastrados)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "E-mail já cadastrado."
 *       500:
 *         description: Erro interno no servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao criar usuário."
 */
router.post("/", createUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Autentica um usuário e retorna um token de autenticação
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do usuário
 *                 example: usuario@example.com
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login bem-sucedido"
 *                 authToken:
 *                   type: string
 *                   description: Token de autenticação JWT
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Falta email ou senha
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Email e senha são obrigatórios."
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Usuário não encontrado."
 *       401:
 *         description: Senha inválida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Senha inválida."
 *       500:
 *         description: Erro ao fazer o login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao fazer o login usuário."
 */
router.post("/login", loginUser);

module.exports = router;
