const Mongoose = require("mongoose")
const Empresa = Mongoose.model("Empresas")

class EmpresaController{

    static async buscarTodos(req,res){
        try {
            res.status(200).json(await Empresa.find({})
            .populate("transacoes.cliente", "nome ")
            .exec())
        } catch (error) {
            console.log("[EmpresaController -> buscarTodos]: " + error);
            res.status(500).send("<p> Infelizmente houve um erro ou buscar empresa!</p>")
        }
    }
    static async buscarNomes(req,res){
         //   console.log("chamou");
        try {
          res.status(200).json(
            await Empresa.find({           
            },"nome")
          );
        } catch (error) {
          console.log("[EmpresaController -> buscarNomes]: " + error);
          res
            .status(500)
            .send(
              "<p> Infelizmente houve um erro ou buscar Empresa por nome!</p>"
            );
        }
    }
    static async buscarPorId(req,res){
        
        try {
            res.status(200).json(
                await Empresa.find({_id:req.params.id}).populate("transacoes.cliente", "nome ")
                .exec()
            )
        } catch (error) {
            console.log("[EmpresaController -> buscarPorId]: " + error);
          res
            .status(500)
            .send(
              "<p> Infelizmente houve um erro ou buscar Empresa por nome!</p>"
            ); 
        }
    }
    static async adicionar(req,res){
        try {
            if(req.body.nome === "" || req.body.nome === undefined || req.body.cnpj === "" || req.body.cnpj === undefined ) return res.status(404).json({mensagem:"Campos obrigatorios não preenchido"})
            
            res.status(200).json(await Empresa.create(req.body))
        } catch (error) {
            console.log("[EmpresaController -> adicionar]: " + error);
            res.status(500).send("<p> Infelizmente houve um erro ou adicionar empresa!</p>")
        }
    }
    static async editar(req,res){
       if(!req.params.id) return res.status(404).json({mensagem:"Favor informar ID para atualizar"})
      
       try {
           res.status(200).json(await Empresa.findOneAndUpdate({_id:req.params.id},req.body, {new:true}))
       } catch (error) {
        console.log("[EmpresaController -> Editar]: " + error);
        res.status(500).send("<p> Infelizmente houve um erro ou excluir empresa!</p>")
       } 
       
    }
    static async excluir(req,res){
        
        try {
            res.status(200).json(await Empresa.findOneAndDelete({_id:req.body._id}))
        } catch (error) {
            console.log("[EmpresaController -> excluir]: " + error);
            res.status(500).send("<p> Infelizmente houve um erro ou excluir empresa!</p>")
        }
    }

}
module.exports = EmpresaController;