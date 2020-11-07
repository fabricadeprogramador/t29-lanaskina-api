const { json } = require("express");
const Mongoose = require("mongoose")
const Empresa = Mongoose.model("Empresas")

class TransacoesController{
    static async buscarTodos(req,res){
      let array = [];
      let todasTransacoes = (await Empresa.find({}, "transacoes").populate("transacoes.cliente", "nome "))
         
      todasTransacoes.forEach((res)=>{
          if(JSON.parse(JSON.stringify(res.transacoes.length) >0)){
          for (let index = 0; index < res.transacoes.length; index++) {
            
            array.push(res.transacoes[index])
              
          }
          }
      })  
      try {
          res.status(200).json(array);
      } catch (error) {
          res.status(500).json({mensagem:"erro ao buscar transações"})
      }

    }
}
module.exports = TransacoesController