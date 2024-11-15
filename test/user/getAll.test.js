const { User } = require("../../models");
const { getAllUsers } = require("../../controllers/user/getAllUsers");

jest.mock("../../models");

const mockUser = [
  {
    id: 1,
    name: "Carlos",
    email: "carlos@email.com",
    fone: "85 123456789",
    active: true
  }
];

describe("getAllUsers", () => {
  it("Deve retornar todos os usuários ativos", async () => {
    User.findAll.mockResolvedValue(mockUser); // Mockando usuários ativos corretamente

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getAllUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUser); // Esperando o retorno mockado
  });

  it("Deve retornar erro 500 em caso de falha", async () => {
    User.findAll.mockRejectedValue(new Error("Erro interno")); // Simulando erro ao buscar usuários

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getAllUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erro ao buscar usuários" });
  });
});
