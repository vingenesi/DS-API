const { deleteUser } = require("../../controllers/user/deleteUser");
const { User } = require("../../models");

jest.mock("../../models"); // Mockando o modelo User

describe("deleteUser", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      params: {
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
    User.findByPk = jest.fn().mockResolvedValue(null);

    await deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Usuário não encontrado." });
  });

  it("deve retornar erro 400 se falhar ao excluir o usuário", async () => {
    // Simulando que o usuário foi encontrado, mas a atualização falha
    User.findByPk = jest.fn().mockResolvedValue({ id: 1 });
    User.update = jest.fn().mockResolvedValue([0]); // Atualização sem sucesso

    await deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Falha ao excluir usuário."
    });
  });

  it("deve excluir o usuário com sucesso e retornar status 200", async () => {
    // Simulando a exclusão bem-sucedida
    User.findByPk = jest.fn().mockResolvedValue({ id: 1 });
    User.update = jest.fn().mockResolvedValue([1]); // Simulando sucesso na atualização

    await deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Usuário excluído com sucesso."
    });
  });

  it("deve retornar erro 500 se ocorrer um erro inesperado", async () => {
    // Simulando um erro no banco de dados
    User.findByPk = jest.fn().mockRejectedValue(new Error("Erro inesperado"));

    await deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Falha ao excluir usuário."
    });
  });
});
