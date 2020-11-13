"use strict";
const Mongoose = require("mongoose");
const Usuario = Mongoose.model("Usuario");

class UsuarioController {
  static async buscarTodos(req, res) {
    try {
      res.status(200).json(await Usuario.find({}));
    } catch (error) {
      console.log("[UsuarioController -> buscarTodos]: " + error);
      res
        .status(500)
        .send("<p> Infelizmente houve um erro ou buscar Usuarios!</p>");
    }
  }

  static async buscarPorNome(req, res) {
    // let nomeBusca = req.params.nome;
    // if (!nomeBusca) res.status(400).send("<p> Nome não informado! </p>");
    // try {
    //   res.status(200).json(
    //     await Convidado.find({
    //       nome: nomeBusca,
    //     })
    //   );
    // } catch (error) {
    //   console.log("[ConvidadoController -> buscarPorNome]: " + error);
    //   res
    //     .status(500)
    //     .send(
    //       "<p> Infelizmente houve um erro ou buscar convidado por nome!</p>"
    //     );
    // }
  }
  static async ativaInativa(req, res) {
    
    try {
      let resultado = await Usuario.findOne({_id:req.params.id});
      resultado.ativo = !resultado.ativo      
      res.status(200).json(await Usuario.findOneAndUpdate({_id:resultado._id}, resultado, {new:true}))     
     
    } catch (error) {
      console.log("[UsuarioController -> ativaInativa]: " + error);
      res
        .status(500)
        .send("<p> Infelizmente houve um erro ou mudar status do Usuario!</p>");
    }
  }

  static async adicionar(req, res) {
    try {
      let resultado = await Usuario.create(req.body);
      res.status(200).json(resultado);
    } catch (error) {
      console.log("[UsuarioController -> adicionar]: " + error);
      res
        .status(500)
        .send("<p> Infelizmente houve um erro ou adicionar o Usuario!</p>");
    }
  }

  static async deletar(req, res) {
    // let idDelete = req.params.id;
    // if (!idDelete)
    //   return res.status(400).send("<p> ID do objeto não informado! </p>");
    // try {
    //   let resultado = await Convidado.findByIdAndDelete({ _id: idDelete });
    //   res.status(200).json(resultado);
    // } catch (error) {
    //   console.log("[ConvidadoController -> deletar]: " + error);
    //   res
    //     .status(500)
    //     .send("<p> Infelizmente houve um erro ou remover o convidado!</p>");
    // }
  }

  static async editar(req, res) {
    try {                
      res.status(200).json(await Usuario.findOneAndUpdate({_id:req.body._id}, req.body, {new:true}))     
     
    } catch (error) {
      console.log("[UsuarioController -> editar]: " + error);
      res
        .status(500)
        .send("<p> Infelizmente houve um erro ao atualizar o Usuario!</p>");
    }
  }
}

module.exports = UsuarioController;
