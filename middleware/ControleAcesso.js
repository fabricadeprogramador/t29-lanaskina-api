const TokenManager = require('./../utils/TokenManager')

module.exports = class ControleAcesso {
  verificarJWT(req, res, next) {
    const token = req.headers['x-access-token']

    if (!token)
      res.status(401).json({ auth: false, message: 'Token não informado!' })

    let usuarioDecodificado = TokenManager.decodificarToken(token)
    if (!usuarioDecodificado)
      res.status(400).json({ auth: false, message: 'Token Inválido!' })

    req.usuario = usuarioDecodificado
    next()
  }
}
