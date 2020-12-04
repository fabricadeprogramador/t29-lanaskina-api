const EmpresaController = require('../controllers/EmpresaController');
const ControleAcesso = require('./../middleware/ControleAcesso');
const acesso = new ControleAcesso();

class EmpresaRoute {
  constructor(express) {
    express
      .route('/empresas')
      .get(acesso.verificarJWT, EmpresaController.buscarTodos)
      .post(acesso.verificarJWT, EmpresaController.adicionar)
      .delete(acesso.verificarJWT, EmpresaController.excluir);
    //Tem que chamar antes do ID, pois depois ele entende a rota buscarPorId
    express
      .route('/empresas/nomes')
      .get(acesso.verificarJWT, EmpresaController.buscarNomes);
    express
      .route('/empresas/totalizadores')
      .get(acesso.verificarJWT, EmpresaController.totalizadores);
    express
      .route('/empresas/transacoes/:idEmpresa')
      .post(acesso.verificarJWT, EmpresaController.criaTransacoes);
    express
      .route('/empresas/totalizadores/:id')
      .get(acesso.verificarJWT, EmpresaController.totalizadoresPorEmpresa);
    express
      .route('/empresas/:id')
      .get(acesso.verificarJWT, EmpresaController.buscarPorId)
      .put(acesso.verificarJWT, EmpresaController.editar);
    express
      .route('/empresas/produto/:id')
      .post(acesso.verificarJWT, EmpresaController.adicionarProduto)
      .put(acesso.verificarJWT, EmpresaController.editarProduto);
  }
}
module.exports = EmpresaRoute;
