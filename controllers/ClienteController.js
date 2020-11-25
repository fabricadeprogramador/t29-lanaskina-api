'use strict'
const Mongoose = require('mongoose')
const Cliente = Mongoose.model('Cliente')
const Empresa = Mongoose.model('Empresas')

class ClienteController {
  static async buscarTodos(req, res) {
    try {
      res.status(200).json(await Cliente.find({}).populate('usuario', 'ativo'))
    } catch (error) {
      console.log('[ClienteController -> buscarTodos]: ' + error)
      res
        .status(500)
        .send('<p> Infelizmente houve um erro ou buscar Clientes!</p>')
    }
  }
  static async buscarCarrinho(req,res){   
    try {
      let idCliente = req.params.cliente_id;
      
      console.log(idCliente)
      let cliente = await Cliente.findById(idCliente)
      let empresa = await Empresa.findById(cliente.carrinho.produtos[0].empresa);
      //res.json(await Cliente.findById(idCliente))
      let produtosDoCarrinho = [];
      cliente.carrinho.produtos.forEach((produtos)=>{
        empresa.produtos.forEach((produtoNaEmpresa)=>{
          if(produtoNaEmpresa._id == produtos.produto){
            let produto = JSON.parse(JSON.stringify(produtoNaEmpresa))
            produto.qtd = produtos.quantidade           
            produtosDoCarrinho.push(produto)
          }
        })
      })

      res.status(200).json(produtosDoCarrinho)

    } catch (error) {
      
    }
  }

  static async buscarTodosComUsuario(req, res) {
    try {
      res
        .status(200)
        .json(
          await Cliente.find({})
            .populate('usuario', 'nome username role ativo')
            .exec()
        )
    } catch (error) {
      console.log('[ClienteController -> buscarTodos]: ' + error)
      res
        .status(500)
        .send('<p> Infelizmente houve um erro ou buscar Clientes!</p>')
    }
  }

  static async adicionarAoCarrinho(req, res) {
    try {
      let clienteId = req.params.cliente_id
      if (!clienteId) res.status(400).json('O cliente deve ser informado')

      if (!req.body) res.status(400).json('Produto faltando')

      let cliente = await Cliente.findById(clienteId)

      
      if (!cliente) res.status(400).json('Cliente não encontrado')

      cliente.carrinho.produtos.push(req.body)
      
      res
        .status(200)
        .json(await Cliente.findOneAndUpdate({ _id: clienteId }, cliente))
    } catch (error) {
      console.log('[ClienteController -> adicionarAoCarrinho]: ' + error)
      res
        .status(500)
        .send(
          '<p> Infelizmente houve um erro ou adicionar produto ao carrinho !</p>'
        )
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

  static async adicionar(req, res) {
    try {
      let resultado = await Cliente.create(req.body)
      res.status(200).json(resultado)
    } catch (error) {
      console.log('[ClienteController -> adicionar]: ' + error)
      res
        .status(500)
        .send('<p> Infelizmente houve um erro ou adicionar o convidado!</p>')
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
      res.status(200).json(
        await Cliente.findOneAndUpdate({ _id: req.body._id }, req.body, {
          new: true
        })
      )
    } catch (error) {
      console.log('[ClienteController -> editar]: ' + error)
      res
        .status(500)
        .send('<p> Infelizmente houve um erro ou editar o cliente!</p>')
    }
  }
}

module.exports = ClienteController
