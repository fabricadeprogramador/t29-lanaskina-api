const UsuarioController = require('./../controllers/UsuarioController');
const ControleAcesso = require('./../middleware/ControleAcesso');
const acesso = new ControleAcesso();

class UsuarioRoute {
  constructor(exp) {
    exp
      .route('/usuarios')
      .get(acesso.verificarJWT, UsuarioController.buscarTodos)
      .post(acesso.verificarJWT, UsuarioController.adicionar)
      .put(acesso.verificarJWT, UsuarioController.editar);

    exp
      .route('/usuarios/:id')
      .delete(acesso.verificarJWT, UsuarioController.deletar)
      .post(acesso.verificarJWT, UsuarioController.ativaInativa);

    exp
      .route('/usuarios/:nome')
      .get(acesso.verificarJWT, UsuarioController.buscarPorNome);

    exp.route('/autenticar').post(UsuarioController.autenticar);
  }
}

module.exports = UsuarioRoute;
