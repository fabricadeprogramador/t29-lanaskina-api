const { json } = require("express");
const Mongoose = require("mongoose");
const Empresa = Mongoose.model("Empresas");

class TransacoesController {
  // static async buscarTodos(req, res) {
  //   let array = [];
  //   let todasTransacoes = await Empresa.find({}, "transacoes").populate(
  //     "transacoes.cliente",
  //     "nome "
  //   );

  //   todasTransacoes.forEach((res) => {
  //     if (JSON.parse(JSON.stringify(res.transacoes.length) > 0)) {
  //       for (let index = 0; index < res.transacoes.length; index++) {
  //         array.push(res.transacoes[index]);
  //       }
  //     }
  //   });
  //   try {
  //     res.status(200).json(array);
  //   } catch (error) {
  //     res.status(500).json({ mensagem: "erro ao buscar transações" });
  //   }
  // }

  static async buscarTodos(req, res) {
    try {
      let resposta = [];
      let empresas = await Empresa.find({})
        .select("transacoes")
        .populate("transacoes.cliente", "nome");

      empresas.forEach((empresa) => {
        if (empresa.transacoes.length > 0) {
          empresa.transacoes.forEach((transacao) => {
            resposta.push(transacao);
          });
        }
      });

      return res.status(200).json(resposta);
    } catch (error) {
      console.log("[TransacoesController -> buscarTodos]: " + error);
      res
        .status(500)
        .send("<p> Infelizmente houve um erro ou buscar transações!</p>");
    }
  }
}
module.exports = TransacoesController;
