const EmpresaController = require("../controllers/EmpresaController");

class EmpresaRoute{
    constructor(express){

        express.route("/empresas")
            .get(EmpresaController.buscarTodos)
            .post(EmpresaController.adicionar)
            .delete(EmpresaController.excluir)
            //Tem que chamar antes do ID, pois depois ele entende a rota buscarPorId
        express.route("/empresas/nomes")
            .get(EmpresaController.buscarNomes)    
        express.route("/empresas/:id")
            .get(EmpresaController.buscarPorId)
            .put(EmpresaController.editar)
        express.route("/empresas/produto/:id")
            .post(EmpresaController.adicionarProduto)
            .put(EmpresaController.editarProduto)

    }
}
module.exports = EmpresaRoute;
