const Mongoose = require("mongoose")
const Empresa = Mongoose.model("Empresas")

class EmpresaController {

    static async buscarTodos(req, res) {
        try {
            res.status(200).json(await Empresa.find({})
                .populate("transacoes.cliente", "nome ")
                .exec())
        } catch (error) {
            console.log("[EmpresaController -> buscarTodos]: " + error);
            res.status(500).send("<p> Infelizmente houve um erro ou buscar empresa!</p>")
        }
    }
    static async buscarNomes(req, res) {
        //   console.log("chamou");
        try {
            res.status(200).json(
                await Empresa.find({
                }, "nome")
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
    static async buscarPorId(req, res) {

        try {
            res.status(200).json(
                await Empresa.findOne({ _id: req.params.id }).populate("transacoes.cliente", "nome ")
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
    static async adicionar(req, res) {
        try {
            if (req.body.nome === "" || req.body.nome === undefined || req.body.cnpj === "" || req.body.cnpj === undefined) return res.status(404).json({ mensagem: "Campos obrigatorios não preenchido" })
            res.status(200).json(await Empresa.create(req.body))

        } catch (error) {
            console.log("[EmpresaController -> adicionar]: " + error);
            res.status(500).send("<p> Infelizmente houve um erro ou adicionar empresa!</p>")
        }
    }
    static async editar(req, res) {
        if (!req.params.id) return res.status(404).json({ mensagem: "Favor informar ID para atualizar" })

        try {
            res.status(200).json(await Empresa.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }))
        } catch (error) {
            console.log("[EmpresaController -> Editar]: " + error);
            res.status(500).send("<p> Infelizmente houve um erro ou excluir empresa!</p>")
        }

    }
    static async excluir(req, res) {

        try {
            res.status(200).json(await Empresa.findOneAndDelete({ _id: req.body._id }))
        } catch (error) {
            console.log("[EmpresaController -> excluir]: " + error);
            res.status(500).send("<p> Infelizmente houve um erro ou excluir empresa!</p>")
        }
    }
    static async adicionarProduto(req, res) {

        if (req.params.id === "undefined") return res.status(404).json({ mensagem: "Id não informado ou não encontrado" })

        if (req.body.nome == undefined || req.body.nome == "" || req.body.valor == undefined || req.body.valor == "") {
            res.status(404).json({ mesagem: "Campos Obrigatórios não preenchidos" })
            return
        }
        try {
            //res.status(200).json(await Empresa.findOneAndUpdate({_id:req.params.id},req.body, {new:true}))
            res.status(200).json(await Empresa.findOneAndUpdate({ _id: req.params.id }, { $push: { produtos: req.body } }, { new: true }));

        } catch (error) {
            console.log("[EmpresaController -> adicionarProduto]: " + error);
            res.status(500).send("<p> Infelizmente houve um erro ao adicionar produto!</p>")
        }
    }
    static async editarProduto(req, res) {
        if (req.params.id === "undefined") return res.status(404).json({ mensagem: "Id não informado ou não encontrado" })

        if (req.body.nome == "" || req.body.nome == "" || req.body.valor == "" || req.body.valor == "") {
            res.status(404).json({ mesagem: "Campos Obrigatórios não preenchidos" })
            return
        }
        let array = [];
        //res.status(200).json(await Empresa.findOneAndUpdate({_id:req.params.id},req.body, {new:true}))
        let arrayAtualizado = await Empresa.findOne({ _id: req.params.id })
            .then((resposta) => {
                resposta.produtos.forEach((produto) => {
                    if (produto._id == req.body._id) {
                        // console.log("antes: ", produto)
                        produto.nome = req.body.nome;
                        produto.valor = req.body.valor;
                        produto.descricao = req.body.descricao;
                        produto.status = req.body.status;
                        // console.log("depois: ", produto)
                    }
                    array.push(produto)
                })
                return array;
            })

        try {
            res.status(200).json(await Empresa.findOneAndUpdate({ _id: req.params.id }, { $set: { produtos: arrayAtualizado } }, { new: true }));
        } catch (error) {
            res.status(500).json({ mensagem: "Erro ao atualizar produto" })
        }
        
        // .then((arrayAtualizado)=>{
        //    try {
        //     res.status(200).json(await Empresa.findOneAndUpdate({_id:req.params.id}, {$set :{ produtos: array}}, {new:true}));
        //    } catch (error) {
        //        res.status(500).json({mensagem:"Erro ao atualizar produto"})
        //    }
        // })
        // .catch((err)=>{
        //     res.status(500).json({mensagem:"Erro ao buscar produto na empresa de id:"+req.params.id})
        // })
    }

}
module.exports = EmpresaController;