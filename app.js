const express = require('express');

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({titulo: "Como criar API"});
});

app.listen(3500, () => {
  console.log("Servidor iniciado na porta 3500: http://localhost:3500");
});