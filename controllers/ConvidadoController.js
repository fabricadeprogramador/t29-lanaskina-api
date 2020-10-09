const Convidado = require("./../models/Convidado")

var geradorId = 3;
var convidados = [
    new Convidado(0, "Jão da Silva", 10, "M"),
    new Convidado(1, "Maria do Bairro", 20, "F"),
    new Convidado(2, "Zé do Caixão", 30, "M"),
    ];

class ConvidadoController {
    
    static buscarTodos(req, res) {
      res.status(200).json(convidados);
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

module.exports = ConvidadoController