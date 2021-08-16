const express = require('express');
const mongoose = require('mongoose');

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
  return res.json({titulo: "Como criar API"});
});

app.listen(3500, () => {
  console.log("Servidor iniciado na porta 3500: http://localhost:3500");
});