var ClienteController = require("./../controllers/ClienteController");

class ClienteRoute {
  constructor(exp) {
    exp
      .route("/clientes")
      .get(ClienteController.buscarTodos)
      .post(ClienteController.adicionar)
      .put(ClienteController.editar);

    exp.route("/clientes/:id").delete(ClienteController.deletar);

    exp.route("/clientes/:nome").get(ClienteController.buscarPorNome);

    exp
      .route("/clientes-com-usuario")
      .get(ClienteController.buscarTodosComUsuario);
  }
}

module.exports = ClienteRoute;
