class ConvidadoRoute {
  constructor(exp) {
    // Atributos do objeto da rota
    this.convidados = [
      {
        _id: 0,
        nome: "Jão da Silva",
        idade: 50,
        sexo: "M",
      },
      {
        _id: 1,
        nome: "Maria do Bairro",
        idade: 25,
        sexo: "F",
      },
      {
        _id: 2,
        nome: "Zé do Caixão",
        idade: 8,
        sexo: "M",
      },
    ];
    this.geradorId = 3;

    //Métodos que registram e tratam as rotas de Convidados
    exp.get("/convidados", (req, res) => {
      res.status(200).json(this.convidados);
    });

    exp.post("/convidados", (req, res) => {
      let novoConvidado = req.body;

      if (novoConvidado.nome === undefined) {
        res.status(500).send("Convidado inválido!");
      } else {
        novoConvidado._id = this.geradorId;
        this.geradorId++;
        this.convidados.push(novoConvidado);
        res.status(200).json(novoConvidado);
      }
    });

    exp.delete("/convidados/:id", (req, res) => {
      let idDelete = req.params.id;
      let indexDel = null;

      this.convidados.forEach((conv, index) => {
        if (conv._id == parseInt(idDelete)) {
          indexDel = index;
        }
      });

      if (indexDel != null) {
        res.status(200).json(this.convidados.splice(indexDel, 1));
      }

      res.status(400).json({});
    });

    exp.put("/convidados", (req, res) => {
      let convidadoNovo = req.body;
      let returnedUpdate = {};

      this.convidados.forEach((conv, index) => {
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
    });
  }
}

module.exports = ConvidadoRoute;
