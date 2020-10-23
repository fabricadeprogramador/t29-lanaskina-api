"use strict";

const Express = require("express");
const Mongoose = require("mongoose");
const Cors = require("cors");

const env = process.NODE_ENV || "development";
const config = require("./config.json")[env];

//Importação dos modelos
const Convidado = require("./models/Convidado");
const Empresa = require("./models/Empresa")

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

    //Conectar o Mongoose com o Banco de Dados (MongoDB Atlas)
    Mongoose.connect(
      `${config.db.protocolo}://${config.db.user}:${config.db.senha}@${config.db.url}/${config.db.nome}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
      console.log("Banco conectado!")
    );

    //Registrando a rota raíz da API
    this.exp.get("/", (req, res) => {
      res.send("<h1>Seja bem-vindo(a) a API Lanaskina!</h1>");
    });

    //Instanciando os modelos, consequentemente registrando os Schemas do Mongoose
    new Convidado();
    new Empresa();

    //Importação de rota
    const ConvidadoRoute = require("./routes/ConvidadoRoute");
    const EmpresaRoute = require("./routes/EmpresaRoute")

    //Setando as outras rotas
    new ConvidadoRoute(this.exp);
    new EmpresaRoute(this.exp);

    // Escutando a porta 3000
    this.exp.listen(process.env.PORT || config.apiPort, () => {
      console.log(`API Lanaskina rodando na porta ${config.apiPort}...`);
    });
  }
}
new App().init();
