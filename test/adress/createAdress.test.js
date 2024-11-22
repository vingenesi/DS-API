const { createAdress } = require("../../controllers/adress/createAdress");
const { Address, User } = require("../../models");

jest.mock("../../models");

describe("createAdress", () => {
  it("should create", async () => {
    const req = {
      body: {
        user_id: 1,
        rua: "Rua dos Bobos",
        bairro: "messajana",
        cidade: "Bairro do Bobos",
        cep: "Cidade do Bobos",
        complemento: "Complemento"
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    User.findByPk.mockResolvedValue({ id: 1 });
    Address.create.mockResolvedValue(req.body);

    await createAdress(req, res);

    expect(res.json).toHaveBeenCalledWith({ addAdress: req.body });
    expect(Address.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("deve retonar erro 500", async () => {
    const req = {
      body: {
        user_id: 1,
        rua: "Rua dos Bobos",
        bairro: "messajana",
        cidade: "Bairro do Bobos",
        cep: "Cidade do Bobos",
        complemento: "Complemento"
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    User.findByPk.mockResolvedValue({ id: 1 });
    Address.create.mockRejectedValue(new Error("Erro ao salvar endereço"));

    await createAdress(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erro ao salvar endereço" });
  });

  it("deve retonar erro 400", async () => {
    const req = {
      body: {
        //user_id: 1,
        rua: "Rua dos Bobos",
        bairro: "messajana",
        cidade: "Bairro do Bobos",
        cep: "Cidade do Bobos",
        complemento: "Complemento"
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    User.findByPk.mockResolvedValue({ id: 1 });
    Address.create.mockResolvedValue(req.body);

    await createAdress(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Todos os dados são obrigatórios."
    });
  });

  it("deve retornar erro 404 se o usuário não for encontrado", async () => {
    const req = {
      body: {
        user_id: 1,
        rua: "Rua dos Bobos",
        bairro: "Messajana",
        cidade: "Cidade dos Bobos",
        cep: "00000-000",
        complemento: "Complemento"
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    User.findByPk.mockResolvedValue(null);
    await createAdress(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Usuário não encontrado." });
  });
});
