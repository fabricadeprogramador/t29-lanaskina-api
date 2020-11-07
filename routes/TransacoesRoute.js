const TransacoesController = require("./../controllers/TransacoesController")

class TransacoesRouter{
    constructor(express){

        express.route("/transacoes")
            .get(TransacoesController.buscarTodos)
    }
}

module.exports = TransacoesRouter