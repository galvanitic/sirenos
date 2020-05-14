const mysql = require('mysql');
const galvanite = require('./galvanite');

class Connection {
  constructor () {
    if(!this.pool) {
      console.log('ligando a mysql...');

      //create pool
      this.pool = mysql.createPool({
        connectionLimit: 100,
        host: galvanite.host,
        user: galvanite.user,
        password: galvanite.password,
        database: galvanite.db
      })

      return this.pool;
    }

    return this.pool;
  }
}

const instance = new Connection();

module.exports = instance;