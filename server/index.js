const express = require('express');
const bodyParser = require('body-parser');
const sirensRouter = require('./routers/sirens');

const app = express();
const puerto = process.env.PORT || 4001;

app.use(bodyParser.json());
app.use('/sirens', sirensRouter);

app.get('/', (req, res) => {
  res.send('Bienvenidx a el API de Sirenos!')
})

app.listen(puerto, () => {
  console.log(`El servidor está activo en el puerto ${puerto}`)
})