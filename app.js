const express = require('express');

const app = express();

app.get("/", (req, res) => {
  res.send("Introducao a API");
});

app.listen(3500, () => {
  console.log("Servidor iniciado na porta 3500: http://localhost:3500");
});