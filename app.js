const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('./models/Artigo');
const Artigo = mongoose.model('artigo');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3500");
  res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');

  app.use(cors());

  next();
});

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

app.get("/artigo/:id", (req, res) => {
  Artigo.findOne({_id: req.params.id}).then((artigo) => {
    return res.json(artigo);
  }).catch((err) => {
    return res.status(400).json({
      error: true,
      message: "Nenhum artigo encontrado! :("
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

app.put("/artigo/:id", (req, res) => {
  const artigo = Artigo.updateOne({_id: req.params.id}, req.body, (err) => {
    if(err) return res.status(400).json({
      error: true,
      message: "Artigo não foi editado com sucesso. :("
    });

    return res.json({
      error: false,
      message: "Artigo editado com sucesso! ;D"
    });
  });
});

app.delete("/artigo/:id", (req, res) => {
  const artigo = Artigo.deleteOne({_id: req.params.id}, (err) => {
    if(err) return res.status(400).json({
      error: true,
      message: "Error: Artigo NÂO foi apagado com sucesso. :("
    });

    return res.json({
      error: false,
      message: "Artigo apagado com sucesso!!!"
    });
  });
});

app.listen(3500, () => {
  console.log("Servidor iniciado na porta 3500: http://localhost:3500");
});