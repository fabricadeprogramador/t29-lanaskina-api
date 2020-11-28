'use strict'

const { Schema, model } = require('mongoose')

class Empresa extends Schema {
  constructor() {
    super({
      nome: {
        type: String,
        required: true,
        unique: true
      },
      dataCriacao: {
        type: Date,
        default: new Date()
      },
      cnpj: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      status: {
        type: Boolean,
        default: true
      },
      tel: {
        type: Number,
        required: true
      },
      imagem: {
        type: String
      },
      endereco: {
        rua: {
          type: String,
          required: true
        },
        numero: {
          type: Number,
          required: true
        },
        bairro: {
          type: String,
          required: true
        }
      },
      produtos: [
        {
          nome: {
            type: String,
            required: true
          },
          imagem: {
            type: String
          },
          descricao: {
            type: String,
            required: true
          },
          valor: {
            type: Number,
            required: true
          },
          status: {
            type: Boolean,
            default: true
          }
        }
      ],
      transacoes: [
        {
          empresaNome: {
            type: String
          },
          ativo: {
            type: Boolean,
            default: true
          },
          dataTransacoes: {
            type: Date,
            default: Date.now
          },
          valorTotal: {
            type: Number,
            required: true
          },
          status: {
            type: String,
            required: true
          },
          produtos: [
            {
              nome: {
                type: String,
                required: true
              },
              valor: {
                type: Number,
                required: true
              },
              //Verificar com o professor porque estoque na transação ao inves de produtos
              quantidade: {
                type: Number,
                required: true
              }
            }
          ],
          cliente: {
            type: Schema.Types.ObjectId,
            ref: 'Cliente'
          }
        }
      ]
    })
    //Momento do registro do Schema do Mongoose
    model('Empresas', this)
  }
}

module.exports = Empresa
