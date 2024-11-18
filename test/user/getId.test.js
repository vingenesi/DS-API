const { getIdUser } = require("../../controllers/user/getIdUser");
const { User } = require("../../models");

jest.mock("../../models"); // Mockando o modelo User

describe("getIdUser", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        id: 1
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
  });

  it("deve retornar erro 404 se o usuário não for encontrado", async () => {
    // Simulando que o usuário não foi encontrado
    User.findOne = jest.fn().mockResolvedValue(null);

    await getIdUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Usuário não encontrado." });
  });

  it("deve retornar o usuário encontrado com sucesso", async () => {
    // Simulando a busca de um usuário existente
    const mockUser = { id: 1, name: "Carlos", email: "carlos@email.com" };
    User.findOne = jest.fn().mockResolvedValue(mockUser);

    await getIdUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it("deve retornar erro 500 se ocorrer um erro inesperado", async () => {
    // Simulando um erro no banco de dados
    User.findOne = jest.fn().mockRejectedValue(new Error("Erro inesperado"));

    await getIdUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erro ao buscar usuário." });
  });
});
