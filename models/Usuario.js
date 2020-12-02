'use strict'

const { Schema, model } = require('mongoose')

class Usuario extends Schema {
  constructor() {
    super({
      nome: {
        type: String,
        required: true
      },
      username: {
        type: String,
        required: true,
        unique: true
      },
      senha: {
        type: String,
        required: false,
        select: false
      },
      role: {
        type: String,
        enum: ['ADMIN', 'CLIENTE'],
        default: 'CLIENTE',
        required: true
      },
      ativo: {
        type: Boolean,
        default: true
      }
    })

    //Momento do registro do Schema do Mongoose
    model('Usuario', this)
  }
}

module.exports = Usuario
