const express = require('express');
const mongoose = require('mongoose');

require('./models/Artigo');
const Artigo = mongoose.model('artigo');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost/imagno', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Conexao com o MongoDB realizada com sucesso!")
}).catch((err) => {
  console.log("Conexao com o MongoDB NAO realizada com sucesso. :(")
});

app.get("/", (req, res) => {
  Artigo.find({}).then((artigo) => {
    return res.json(artigo);
  }).catch((err) => {
    return res.status(400).json({
      error: true,
      message: "Nenhum artigo encontrado."
    });
  });
});

app.post("/artigo", (req, res) => {
  const artigo = Artigo.create(req.body, (err) => {
    if(err) return res.status(400).json({
      error: true,
      message: "Erro: Artigo não foi cadastrado"
    });

    return res.status(200).json({
      error: false,
      message: "Artigo cadastrado com sucesso!"
    });

  });
});

app.listen(3500, () => {
  console.log("Servidor iniciado na porta 3500: http://localhost:3500");
});