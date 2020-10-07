"use strict";

const Express = require("express");
const Cors = require("cors");

//Importação de rota
const ConvidadoRoute = require("./routes/ConvidadoRoute");

class App {
  constructor() {
    //app é a instância do Express - Inicialmente vazia, inicializado no init()
    this.exp;
  }

  // Método que inicializa o servidor e escuta a porta com o serviço
  init() {
    // Instanciando o Express
    this.exp = Express();

    // Setando Cross Origin no Express para aceitar requisição de todos os Hosts
    this.exp.use(Cors());

    //Setando o parser no Express para automaticamente converter respostas e requisições de JSON para Objeto JS e vice-versa
    this.exp.use(Express.json());

    //Registrando a rota raíz da API
    this.exp.get("/", (req, res) => {
      res.send("<h1>Seja bem-vindo(a) a API Lanaskina!<h1>");
    });

    //Setando as outras rotas
    new ConvidadoRoute(this.exp);

    // Escutando a porta 3000
    this.exp.listen(3000, () => {
      console.log("API Lanaskina rodando na porta 3000...");
    });
  }
}
new App().init();
