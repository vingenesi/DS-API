const { createUser } = require("../../controllers/user/createUser");
const { User } = require("../../models");
const { generateRegistrationToken } = require("../../middleware/generateToken");
const bcrypt = require("bcrypt");

jest.mock("../../models");
jest.mock("bcrypt");
jest.mock("../../middleware/generateToken");

describe("createUser", () => {
  it("Deve retornar erro 400 se dados obrigatórios estiverem ausentes", async () => {
    const req = { body: { email: "test@email.com" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Nome, email e senha são obrigatórios."
    });
  });

  it("Deve retornar erro 400 se o e-mail for inválido", async () => {
    const req = {
      body: { name: "Carlos", email: "invalid-email", password: "password123" }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Formato de e-mail inválido."
    });
  });

  it("Deve retornar erro 409 se o e-mail já estiver cadastrado", async () => {
    const req = {
      body: { name: "Carlos", email: "test@email.com", password: "password123" }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    User.findOne.mockResolvedValue({ email: "test@email.com" });

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ error: "E-mail já cadastrado." });
  });

  it("Deve retornar erro 409 se o CPF já estiver cadastrado", async () => {
    const req = {
      body: {
        name: "Carlos",
        email: "new@email.com",
        cpf: "12345678901",
        password: "password123"
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    User.findOne.mockResolvedValue({ cpf: "12345678901" });

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ error: "CPF já cadastrado." });
  });

  it("Deve criar o usuário e retornar status 201 com o token de registro", async () => {
    const req = {
      body: {
        id: 1,
        name: "Carlos",
        email: "new@email.com",
        password: "password123",
        cpf: "12345678901"
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    //const mockHashedPassword = "hashedPassword"; // Mock da senha criptografada
    /*
    const mockCreateUser = {
      id: 1,
      name: "Carlos",
      email: "carlos@email.com",
      cpf: "12345678901"
    };
   */

    bcrypt.hash.mockResolvedValue(req.body.password); // Mock do bcrypt.hash
    User.create.mockResolvedValue(req.body); // Mock do User.create
    generateRegistrationToken.mockReturnValue("mockToken"); // Mock do token

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201); // Espera que o status 201 seja chamado
    expect(res.json).toHaveBeenCalledWith({
      newUser: req.body,
      registrationToken: "mockToken" // Espera que o token gerado seja "mockToken"
    });
  });

  it("Deve retornar erro 500 se houver falha ao criar o usuário", async () => {
    const req = {
      body: { name: "Carlos", email: "new@email.com", password: "password123" }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    User.create.mockRejectedValue(new Error("Erro ao criar usuário"));

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erro ao criar usuário." });
  });
});
