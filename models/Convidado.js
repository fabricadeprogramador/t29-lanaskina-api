"use strict";

const Mongoose = require("mongoose");

class Convidado extends Mongoose.Schema {
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
    Mongoose.model("Convidado", this);
  }
}

module.exports = Convidado;
