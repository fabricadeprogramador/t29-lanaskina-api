"use strict";

const Express = require("express");
const Cors = require("cors");

class App {
  constructor() {
    //app é a instância do Express - Inicialmente vazia, inicializado no init()
    this.exp;
    this.convidados = [];
    this.geradorId = 3;
  }

  init() {
    this.exp = Express();
    this.exp.use(Cors());
    this.exp.use(Express.json());
    this.setarConvidados();

    this.exp.get("/", (req, res) => {
      res.send("Seja bem-vindo(a) a API Lanaskina!");
    });

    this.exp.get("/convidados", (req, res) => {
      res.status(200).json(this.convidados);
    });

    this.exp.post("/convidados", (req, res) => {
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

    this.exp.listen(3000, () => {
      console.log("API Lanaskina rodando na porta 3000...");
    });
  }

  setarConvidados() {
    this.convidados = [
      {
        _id: "0",
        nome: "T29-Teste",
        idade: "25",
        sexo: "F",
        __v: 0,
      },
      {
        _id: "1",
        nome: "Fetch Test ED",
        idade: "12",
        sexo: "M",
        __v: 0,
      },
      {
        _id: "2",
        nome: "T29 - Cleiton Duarte EDITADO",
        idade: "30",
        sexo: "M",
        __v: 0,
      },
    ];
  }
}
new App().init();
