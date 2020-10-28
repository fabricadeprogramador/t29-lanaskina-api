var UsuarioController = require("./../controllers/UsuarioController");

class UsuarioRoute {
  constructor(exp) {
    exp
      .route("/usuarios")
      .get(UsuarioController.buscarTodos)
      .post(UsuarioController.adicionar)
      .put(UsuarioController.editar);

    exp.route("/usuarios/:id").delete(UsuarioController.deletar);

    exp.route("/usuarios/:nome").get(UsuarioController.buscarPorNome);
  }
}

module.exports = UsuarioRoute;
