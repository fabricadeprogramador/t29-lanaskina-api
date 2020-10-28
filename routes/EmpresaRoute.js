const EmpresaController = require("../controllers/EmpresaController");

class EmpresaRoute {
  constructor(express) {
    express
      .route("/empresas")
      .get(EmpresaController.buscarTodos)
      .post(EmpresaController.adicionar)
      .delete(EmpresaController.excluir);
    express.route("/empresas/:id").put(EmpresaController.editar);
    express.route("/empresas/nomes").get(EmpresaController.buscarNomes);
  }
}
module.exports = EmpresaRoute;
