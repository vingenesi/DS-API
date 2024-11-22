const { createUser } = require("../controllers/user/createUser");
const { deleteUser } = require("../controllers/user/deleteUser");
const { getAllUsers } = require("../controllers/user/getAllUsers");
const { getIdUser } = require("../controllers/user/getIdUser");
const { loginUser } = require("../controllers/user/loginUser");

var express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
var router = express.Router();

//router.get("/:id/addresses", authenticateToken, getUserWithAddresses);

//router.get("/:id", getIdUser);

/**
 * @swagger
 * tags:
 *   - name: Usuários
 *     description: Operações relacionadas a usuários.
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Exclui um usuário
 *     description: Desativa um usuário, marcando-o como inativo em vez de deletá-lo fisicamente do banco de dados.
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser desativado
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Usuário desativado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso
 *                   example: "Usuário excluído com sucesso."
 *       400:
 *         description: Falha ao excluir o usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Detalhes sobre o erro
 *                   example: "Falha ao excluir usuário."
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
 *         description: Erro interno ao excluir o usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Detalhes sobre o erro
 *                   example: "Falha ao excluir usuário."
 */
router.delete("/:id", deleteUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Exclui um usuário
 *     description: Desativa um usuário, marcando-o como inativo em vez de deletá-lo fisicamente do banco de dados.
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser desativado
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Usuário desativado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso
 *                   example: "Usuário excluído com sucesso."
 *       400:
 *         description: Falha ao excluir o usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Detalhes sobre o erro
 *                   example: "Falha ao excluir usuário."
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
 *         description: Erro interno ao excluir o usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Detalhes sobre o erro
 *                   example: "Falha ao excluir usuário."
 */
router.get("/", getAllUsers);

//router.post("/", authenticateToken, createUser);

/**
 * @swagger
 * tags:
 *   - name: Autenticação
 *     description: Operações relacionadas à autenticação de usuários.
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza o login de um usuário
 *     description: O endpoint realiza a autenticação de um usuário fornecendo um email e uma senha, retornando um token de autenticação (authToken) se as credenciais forem válidas.
 *     tags: [Autenticação]
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
 *                   description: Mensagem de sucesso
 *                   example: "Login bem-sucedido"
 *                 authToken:
 *                   type: string
 *                   description: Token de autenticação gerado
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNjEyMzQ1Njc4fQ.xNpZFYvXw2rHii7m..."
 *       400:
 *         description: Email e senha são obrigatórios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Detalhes sobre o erro
 *                   example: "Email e senha são obrigatórios."
 *       401:
 *         description: Senha inválida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Detalhes sobre o erro
 *                   example: "Senha inválida."
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
 *         description: Erro ao realizar o login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Detalhes sobre o erro
 *                   example: "Erro ao fazer o login usuário."
 */

router.post("/login", loginUser);

module.exports = router;
