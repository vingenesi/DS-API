const {
  createUserWithAddress
} = require("../../controllers/userWithAddress/createUserWithAddress");
const { createUserData } = require("../../controllers/user/createUserData");
const {
  createAddressData
} = require("../../controllers/adress/createAddressData");

// Mocks
jest.mock("../../controllers/adress/createAddressData");
jest.mock("../../controllers/user/createUserData");

describe("createUserWithAddress", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        name: "Test User",
        email: "test@example.com",
        cpf: "12345678900",
        fone: "123456789",
        password: "password123",
        rua: "Rua Exemplo",
        bairro: "Bairro Exemplo",
        cidade: "Cidade Exemplo",
        cep: "12345-678",
        complemento: "Apto 101"
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  it("should create a user and address successfully", async () => {
    // Mock implementações de sucesso
    createUserData.mockResolvedValue({
      id: 1,
      name: "Test User",
      email: "test@example.com"
    });

    createAddressData.mockResolvedValue({
      id: 1,
      user_id: 1,
      rua: "Rua Exemplo",
      bairro: "Bairro Exemplo",
      cidade: "Cidade Exemplo",
      cep: "12345-678",
      complemento: "Apto 101"
    });

    await createUserWithAddress(req, res);

    expect(createUserData).toHaveBeenCalledWith({
      name: "Test User",
      email: "test@example.com",
      cpf: "12345678900",
      fone: "123456789",
      password: "password123"
    });

    expect(createAddressData).toHaveBeenCalledWith({
      user_id: 1,
      rua: "Rua Exemplo",
      bairro: "Bairro Exemplo",
      cidade: "Cidade Exemplo",
      cep: "12345-678",
      complemento: "Apto 101"
    });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      user: {
        id: 1,
        name: "Test User",
        email: "test@example.com"
      },
      address: {
        id: 1,
        user_id: 1,
        rua: "Rua Exemplo",
        bairro: "Bairro Exemplo",
        cidade: "Cidade Exemplo",
        cep: "12345-678",
        complemento: "Apto 101"
      }
    });
  });

  it("should return 400 if required fields are missing", async () => {
    req.body.name = undefined;

    await createUserWithAddress(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Todos os dados são obrigatórios."
    });
  });

  it("should handle errors from createUserData", async () => {
    createUserData.mockRejectedValue(new Error("Erro ao criar usuário"));

    await createUserWithAddress(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erro ao criar usuário" });
  });

  it("should handle errors from createAddressData", async () => {
    createUserData.mockResolvedValue({
      id: 1,
      name: "Test User",
      email: "test@example.com"
    });

    createAddressData.mockRejectedValue(new Error("Erro ao criar endereço"));

    await createUserWithAddress(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erro ao criar endereço" });
  });
});
