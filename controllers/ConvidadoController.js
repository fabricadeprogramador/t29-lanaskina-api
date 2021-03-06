"use strict";
const Mongoose = require("mongoose");
const Convidado = Mongoose.model("Convidado");

class ConvidadoController {
  static async buscarTodos(req, res) {
    try {
      res.status(200).json(await Convidado.find({}));
    } catch (error) {
      console.log("[ConvidadoController -> buscarTodos]: " + error);
      res
        .status(500)
        .send("<p> Infelizmente houve um erro ou buscar convidados!</p>");
    }
  }

  static async buscarPorNome(req, res) {
    let nomeBusca = req.params.nome;

    if (!nomeBusca) res.status(400).send("<p> Nome não informado! </p>");

    try {
      res.status(200).json(
        await Convidado.find({
          nome: nomeBusca,
        })
      );
    } catch (error) {
      console.log("[ConvidadoController -> buscarPorNome]: " + error);
      res
        .status(500)
        .send(
          "<p> Infelizmente houve um erro ou buscar convidado por nome!</p>"
        );
    }
  }

  static async adicionar(req, res) {
    try {
      let resultado = await Convidado.create(req.body);
      res.status(200).json(resultado);
    } catch (error) {
      console.log("[ConvidadoController -> adicionar]: " + error);
      res
        .status(500)
        .send("<p> Infelizmente houve um erro ou adicionar o convidado!</p>");
    }
  }

  static async deletar(req, res) {
    let idDelete = req.params.id;

    if (!idDelete)
      return res.status(400).send("<p> ID do objeto não informado! </p>");

    try {
      let resultado = await Convidado.findByIdAndDelete({ _id: idDelete });
      res.status(200).json(resultado);
    } catch (error) {
      console.log("[ConvidadoController -> deletar]: " + error);
      res
        .status(500)
        .send("<p> Infelizmente houve um erro ou remover o convidado!</p>");
    }
  }

  static async editar(req, res) {
    let idUpdate = req.body._id;

    if (!idUpdate)
      return res.status(400).send("<p> ID do objeto não informado! </p>");

    try {
      let resultado = await Convidado.findByIdAndUpdate(idUpdate, req.body);
      res.status(200).json(resultado);
    } catch (error) {
      console.log("[ConvidadoController -> editar]: " + error);
      res
        .status(500)
        .send("<p> Infelizmente houve um erro ou editar o convidado!</p>");
    }
  }
}

module.exports = ConvidadoController;
