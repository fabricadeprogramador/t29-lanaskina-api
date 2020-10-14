"use strict";
const Mongoose = require("mongoose");
const Convidado = Mongoose.model("Convidado");

class ConvidadoController {
  // static buscarTodos(req, res) {
  //   res.status(200).json(convidados);
  // }

  static async buscarTodos(req, res) {
    try {
      res.status(200).json(await Convidado.find({}));
    } catch (error) {
      console.log("[Convidado Controller -> buscarTodos]: " + error);
      res
        .status(500)
        .send("<p> Infelizmente houve um erro ou buscar convidados!</p>");
    }
  }

  static adicionar(req, res) {
    let novoConvidado = req.body;

    if (novoConvidado.nome === undefined) {
      res.status(500).send("Convidado inválido!");
    } else {
      novoConvidado._id = geradorId;
      geradorId++;
      convidados.push(novoConvidado);
      res.status(200).json(novoConvidado);
    }
  }

  static deletar(req, res) {
    let idDelete = req.params.id;
    let indexDel = null;

    convidados.forEach((conv, index) => {
      if (conv._id == parseInt(idDelete)) {
        indexDel = index;
      }
    });

    if (indexDel != null) {
      res.status(200).json(convidados.splice(indexDel, 1));
    }

    res.status(400).json({});
  }

  static editar(req, res) {
    let convidadoNovo = req.body;
    let returnedUpdate = {};

    convidados.forEach((conv, index) => {
      if (conv._id == convidadoNovo._id) {
        Object.assign(returnedUpdate, conv);
        conv.nome = convidadoNovo.nome;
        conv.idade = convidadoNovo.idade;
        conv.sexo = convidadoNovo.sexo;
      }
    });

    if (returnedUpdate._id != undefined) {
      res.status(200).json(returnedUpdate);
    }

    res.status(400).json({});
  }
}

module.exports = ConvidadoController;
