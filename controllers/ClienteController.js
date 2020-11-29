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
  static async buscarHistorico(req, res) {
   try {
    let idCliente = req.params.idCliente
    let historicoCliente = [];

    let empresas = await Empresa.find();
    empresas.forEach((empresa) => {
      empresa.transacoes.forEach((transacao) => {
        if (transacao.cliente == idCliente) {
          let historico = {};

          historico._idTransacao = transacao._id
          historico.valorTotal = transacao.valorTotal
          historico.dataTransacao = transacao.dataTransacoes
          historicoCliente.push(historico)
        }
      })
    })
    res.status(200).json(historicoCliente)
   } catch (error) {
    console.log('[ClienteController -> buscarHistorico]: ' + error)
    res
      .status(500)
      .send('<p> Infelizmente houve um erro ao  buscar Historico!</p>')
   }
  }
  static async buscarCarrinho(req, res) {
    try {
      let idCliente = req.params.cliente_id;

      let cliente = await Cliente.findById(idCliente)

      if (JSON.parse(JSON.stringify(cliente.carrinho.produtos)).length > 0) {
        let empresa = await Empresa.findById(cliente.carrinho.produtos[0].empresa);

        let produtosDoCarrinho = [];
        cliente.carrinho.produtos.forEach((produtos) => {

          empresa.produtos.forEach((produtoNaEmpresa) => {

            if (produtoNaEmpresa._id == produtos.produto) {
              let produto = JSON.parse(JSON.stringify(produtos))
              produto.nome = produtoNaEmpresa.nome
              produto.valor = produtoNaEmpresa.valor
              produto.imagem = produtoNaEmpresa.imagem
              produtosDoCarrinho.push(produto)

            }
          })
        })
        res.status(200).json(produtosDoCarrinho)
      } else {
        res.status(204)
          .send('<p>Não existe produtos no carrinho</p>')
      }

    } catch (error) {
      console.log('[ClienteController -> buscarCarrinho]: ' + error)
      res
        .status(500)
        .send('<p> Infelizmente houve um erro ao  buscar Carrinho!</p>')
    }
  }

  ///Verificar com professor pq essa função está sendo chamada ao carregar carrinho no front-end

  static async excluirProdutoCarrinho(req, res) {
    try {
      let idCliente = req.params.cliente_id;

      let buscaCliente = await Cliente.findOne({ _id: idCliente })
      buscaCliente.carrinho.produtos = await req.body;

      let carrinhoAtualizado = await Cliente.findOneAndUpdate({ _id: idCliente }, buscaCliente, { new: true })

      var produtosDoCarrinho = [];

      //verifica se existe produtos para excluir
      if (carrinhoAtualizado.carrinho.produtos.length > 0) {
        // console.log('1')
        let empresa = await Empresa.findById(carrinhoAtualizado.carrinho.produtos[0].empresa);
        carrinhoAtualizado.carrinho.produtos.forEach((produtos) => {


          empresa.produtos.forEach((produtoNaEmpresa) => {

            if (produtoNaEmpresa._id == produtos.produto) {
              let produto = JSON.parse(JSON.stringify(produtos))
              produto.nome = produtoNaEmpresa.nome
              produto.valor = produtoNaEmpresa.valor
              produto.imagem = produtoNaEmpresa.imagem
              produtosDoCarrinho.push(produto)

            }
          })
        })
        res.status(200).json(produtosDoCarrinho)
      } else {
        //console.log('2')

        res.status(200).json(produtosDoCarrinho)
      }

    } catch (error) {
      console.log('[ClienteController -> excluirProdutoCarrinho]: ' + error)
      res
        .status(500)
        .send('<p> Infelizmente houve um erro ao  excluir produto do Carrinho!</p>')
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

      //verificar se ja tem mais de um produto no carrinho para verificar se é da mesma empresa, caso seja primeiro nem faz a verificação    
      if (JSON.parse(JSON.stringify(cliente.carrinho.produtos)).length > 1) {

        //verificar com o professor como pegar o status 401 no front... nao consigo pegar a resposta lá  
        //Verifica se é a mesma Empresa   

        let mesmaEmpresa = ClienteController.verificaSeMesmaEmpresa(cliente.carrinho)
        if (mesmaEmpresa) return res.status(202).json("Não autorizado.Existe produtos no carrinho de outra empresa!")

        res.status(200).json(await Cliente.findOneAndUpdate({ _id: clienteId }, cliente))

      } else {
        //console.log("else", cliente.carrinho.produtos)
        res.status(200).json(await Cliente.findOneAndUpdate({ _id: clienteId }, cliente))
      }

    } catch (error) {
      console.log('[ClienteController -> adicionarAoCarrinho]: ' + error)
      res
        .status(500)
        .send(
          '<p> Infelizmente houve um erro ou adicionar produto ao carrinho !</p>'
        )
    }
  }
  static verificaSeMesmaEmpresa(carrinho) {
    let idEmpresa = carrinho.produtos[0].empresa
    let empresaDiferente = false;
    carrinho.produtos.forEach((produto) => {

      if (produto.empresa != idEmpresa) {
        empresaDiferente = true
      }

    })
    return empresaDiferente;

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
