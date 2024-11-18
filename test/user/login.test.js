const { loginUser } = require("../../controllers/user/loginUser");
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const { generateAuthToken } = require("../../middleware/generateToken");

jest.mock("../../models"); // Mockando o modelo User
jest.mock("../../middleware/generateToken"); // Mockando a função generateAuthToken
jest.mock("bcrypt"); // Mockando o bcrypt

describe("loginUser", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        email: "test@email.com",
        password: "password123"
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
  });

  it("deve retornar erro 400 se email ou senha estiverem ausentes", async () => {
    req.body.email = ""; // Simulando ausência de email
    await loginUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Email e senha são obrigatórios."
    });

    req.body.email = "test@email.com";
    req.body.password = ""; // Simulando ausência de senha
    await loginUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Email e senha são obrigatórios."
    });
  });

  it("deve retornar erro 404 se o usuário não for encontrado", async () => {
    User.findOne = jest.fn().mockResolvedValue(null); // Simulando usuário não encontrado

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Usuário não encontrado." });
  });

  it("deve retornar erro 401 se a senha for inválida", async () => {
    const mockUser = { email: "test@email.com", password: "hashedPassword" };
    User.findOne = jest.fn().mockResolvedValue(mockUser); // Simulando usuário encontrado

    bcrypt.compare = jest.fn().mockResolvedValue(false); // Simulando senha inválida

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Senha inválida." });
  });

  it("deve realizar o login com sucesso e retornar o token de autenticação", async () => {
    const mockUser = {
      id: 1,
      email: "test@email.com",
      password: "hashedPassword"
    };
    User.findOne = jest.fn().mockResolvedValue(mockUser); // Simulando usuário encontrado

    bcrypt.compare = jest.fn().mockResolvedValue(true); // Simulando senha válida

    generateAuthToken.mockReturnValue("mockToken"); // Mockando o retorno do token

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Login bem-sucedido",
      authToken: "mockToken"
    });
  });

  it("deve retornar erro 500 se ocorrer um erro interno", async () => {
    User.findOne = jest.fn().mockRejectedValue(new Error("Erro inesperado"));

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro ao fazer o login usuário."
    });
  });
});
