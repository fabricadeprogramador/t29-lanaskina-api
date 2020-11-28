const Mongoose = require("mongoose")
const Empresa = Mongoose.model("Empresas")
const Cliente = Mongoose.model("Cliente")

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
                await Empresa.findOne({ _id: req.params.id }).populate("transacoes.cliente", "_id nome ativo")
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
            console.log("[EmpresaController -> editarProduto]: " + error);
            res.status(500).send("<p> Infelizmente houve um erro ao atualizar produto!</p>")           
        }
        
    }
    static async totalizadores(req,res){
      try {
        let totalizadores = {totalAtual:{}, totalMes:{} };
        let mesAnoAtual = JSON.stringify(new Date()).slice(1,8);

        let todosCliente = await Cliente.find();       
        let todasEmpresas = await Empresa.find();

        totalizadores.totalAtual.clientes = todosCliente.length;        
        totalizadores.totalAtual.empresas = todasEmpresas.length;

        //Incia contagem para que no for consiga implementar contador
        totalizadores.totalMes.empresas =0;
        totalizadores.totalMes.clientes =0;
        totalizadores.totalMes.movimentacao = 0;
        totalizadores.totalAtual.movimentacao = 0;

        todosCliente.forEach((cliente)=>{
            let dataCriacaoCliente =JSON.stringify(cliente.dataCriacao).slice(1,8)
            if(dataCriacaoCliente == mesAnoAtual){               
                totalizadores.totalMes.clientes += 1                           
            }
        })
        
        
        todasEmpresas.forEach((empresa)=>{
            let dataCriacaoEmpresa =JSON.stringify(empresa.dataCriacao).slice(1,8);  
            //verifica empresas cadastrada no mes            
            if(dataCriacaoEmpresa == mesAnoAtual){               
                totalizadores.totalMes.empresas += 1                           
            }

            
            empresa.transacoes.forEach((transacao)=>{
                let dataCriacaoTransacao =JSON.stringify(transacao.dataTransacoes).slice(1,8);
                //verifica Total movimentação até o mes atual
               if(transacao.status == "Concluido"){                                    
                    totalizadores.totalAtual.movimentacao += transacao.valor;
                    //verifica se a movimentação é do mes atual
                    if(dataCriacaoTransacao == mesAnoAtual){
                        totalizadores.totalMes.movimentacao += transacao.valor
                    }
                }                
            })

        })
        //10% de comissão
       totalizadores.totalAtual.receita = totalizadores.totalAtual.movimentacao*0.1;
       totalizadores.totalMes.receita = totalizadores.totalMes.movimentacao*0.1;
       res.status(200).json(totalizadores)
        let newData = new Date();
       // console.log(newData)
       
      } catch (error) {
        console.log("[EmpresaController -> totalizadores]: " + error);
        res.status(500).send("<p> Infelizmente houve um erro ao buscar totalizadores!</p>")  
      }
    }
    static async totalizadoresPorEmpresa(req,res){
        let totalizadorPorEmpresa = {};
        totalizadorPorEmpresa.movimentacao = 0;

        try {
            let empresa = await Empresa.findOne({_id:req.params.id});
            totalizadorPorEmpresa.totalTransacoes = empresa.transacoes.length;
            //verifica se tem transação antes do for
            if(empresa.transacoes.length>0){
                empresa.transacoes.forEach((trans)=>{
                    if(trans.status == "Concluido"){
                        totalizadorPorEmpresa.movimentacao += trans.valor
                    }
                })
            }
            totalizadorPorEmpresa.receita =  totalizadorPorEmpresa.movimentacao*0.1;

            res.status(200).json(totalizadorPorEmpresa);
            
        } catch (error) {
         console.log("[EmpresaController -> totalizadoresPorEmpresa]: " + error);
        res.status(500).send("<p> Infelizmente houve um erro ao buscar totalizadoresPorEmpresa!</p>") 
        }
       
    }  
    static async criaTransacoes(req, res){
       try {
           
           let empresa = await Empresa.findOne({_id:req.params.idEmpresa})  
           let transacao = req.body   
           transacao.empresaNome = empresa.nome         
           empresa.transacoes.push(req.body);
           await Empresa.findOneAndUpdate({_id:req.params.idEmpresa}, empresa, {new:true})

           let respostaCliente = await Cliente.findOne({_id:req.body.cliente})
           respostaCliente.carrinho.produtos = []
           
           res.status(200).json(await Cliente.findOneAndUpdate({_id:req.body.cliente}, respostaCliente, {new:true}))

           
       } catch (error) {
        console.log("[EmpresaController -> criaTransacoes]: " + error);
        res.status(500).send("<p> Infelizmente houve um erro ao finalizar Pagamento!</p>") 
       }
    }

}
module.exports = EmpresaController;