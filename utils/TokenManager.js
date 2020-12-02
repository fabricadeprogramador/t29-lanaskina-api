const jwt = require('jsonwebtoken')

class TokenManager {
  criarToken(usuario, config = {}) {
    return jwt.sign({ usuario }, process.env.SECRET, config)
  }

  decodificarToken(token) {
    try {
      return jwt.verify(token, process.env.SECRET)
    } catch (error) {
      throw {
        message: 'Erro ao decodificar token',
        status: 400
      }
    }
  }
}

module.exports = new TokenManager()
