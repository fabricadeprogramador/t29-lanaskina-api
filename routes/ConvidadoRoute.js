var ConvidadoController = require("./../controllers/ConvidadoController")

class ConvidadoRoute {
  constructor(exp) {

    //Métodos que registram e tratam as rotas de Convidados
    exp.route("/convidados")
      .get(ConvidadoController.buscarTodos)
      .post(ConvidadoController.adicionar)
      .put(ConvidadoController.editar);
    
    exp.route("/convidados/:id")
      .delete(ConvidadoController.deletar)
  }
}

module.exports = ConvidadoRoute;
