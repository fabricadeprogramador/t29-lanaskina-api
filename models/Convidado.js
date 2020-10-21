"use strict";

const { Schema, model } = require("mongoose");

class Convidado extends Schema {
  constructor() {
    super({
      nome: {
        type: String,
        required: true,
      },
      idade: {
        type: Number,
        required: true,
      },
      sexo: {
        type: String,
        required: false,
      },
    });

    //Momento do registro do Schema do Mongoose
    model("Convidado", this);
  }
}

module.exports = Convidado;
