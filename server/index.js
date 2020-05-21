const express = require('express');
const bodyParser = require('body-parser');
const cors  = require('cors');
const sirensRouter = require('./routers/sirens');
const app = express();
const puerto = process.env.PORT || 4001;

// var whitelist = ['http://45.19.194.191:443', 'http://45.19.194.191:80', 'http://45.19.194.191', 'http://sirenos.co', 'https://sirenos.co', 'http://www.sirenos.co', 'https://www.sirenos.co']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('No permitido por el maldito CORS'))
    }
  }
}

app.use(cors());
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://sirenos.co');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.use(bodyParser.json());
app.use('/sirens', sirensRouter);

app.get('/', (req, res) => {
  res.send('Bienvenidx a el API de Sirenos!')
})

app.listen(puerto, () => {
  console.log(`El servidor está activo en el puerto ${puerto}`)
})