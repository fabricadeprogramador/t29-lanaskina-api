"use strict";

const Express = require("express");
const Mongoose = require("mongoose");
const Cors = require("cors");

//Importação dos modelos
const Convidado = require("./models/Convidado");

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

    //Conectar o Mongoose com o Banco de Dados (MongoDB Atlas)
    Mongoose.connect(
      "mongodb+srv://t29lanaskina:t29lanaskina@cluster0.zronz.mongodb.net/lanaskina-db?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    //Registrando a rota raíz da API
    this.exp.get("/", (req, res) => {
      res.send("<h1>Seja bem-vindo(a) a API Lanaskina!</h1>");
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

//Nome do banco : lanaskina-db
//User Password: t29lanaskina
//User Name: t29lanaskina

//link: mongodb+srv://<username>:<password>@cluster0.zronz.mongodb.net/<dbname>?retryWrites=true&w=majority
