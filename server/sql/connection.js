const mysql = require('mysql');
const galvanite = require('./galvanite');

class Connection {
  constructor () {
    if(!this.pool) {
      console.log('ligando a mysql...');

      //create pool
      const config = mysql.createPool({
        connectionLimit: 100,
        host: galvanite.host,
        user: galvanite.user,
        password: galvanite.password,
        database: galvanite.db
      });

      if (process.env.NODE_ENV === 'production' && process.env.CLOUD_INSTANCE) {
        console.log(`connect socket: ${process.env.CLOUD_INSTANCE}`)
        config.socketPath = `/cloudsql/${process.env.CLOUD_INSTANCE}`
      }

      this.pool = mysql.createPool(config)

      return this.pool;
    }

    return this.pool;
  }
}

const instance = new Connection();

module.exports = instance;