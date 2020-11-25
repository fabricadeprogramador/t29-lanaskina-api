'use strict'

const { Schema, model } = require('mongoose')

class Cliente extends Schema {
  constructor() {
    super({
      nome: {
        type: String,
        required: true
      },
      endereco: {
        rua: { type: String },
        numero: { type: Number },
        bairro: { type: String }
      },
      dataNascimento: {
        type: String
      },
      cpf: {
        type: String,
        required: true,
        unique: true
      },
      telefone: {
        type: String
      },
      sexo: {
        type: String
      },
      email: {
        type: String
      },
      usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
      },
      dataCriacao: {
        type: Date,
        default: new Date()
      },
      carrinho: {
        produtos: [
          {
            empresa: {
              type: String,
              required: true
            },
            produto: {
              type: String,
              required: true
            },
            quantidade: {
              type: Number,
              required: true
            }
          }
        ]
      }
    })

    //Momento do registro do Schema do Mongoose
    model('Cliente', this)
  }
}

module.exports = Cliente
