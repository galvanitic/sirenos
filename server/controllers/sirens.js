const mysql = require('mysql');
const pool = require('../sql/connection');
const {handleSQLError} = require('../sql/error');

const getSirensByDateRange = (req, res) => {
  let sql = "SELECT * FROM Siren.Sirens WHERE `date` BETWEEN ? and ?;";
  sql = mysql.format(sql, [req.params.start, req.params.end]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getSirensByID = (req, res) => {
  let sql = "SELECT * FROM Siren.Sirens WHERE `siren_id` = ?;";
  sql = mysql.format(sql, [req.params.siren_id]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const addSiren = (req, res) => {
  const { lat, lng, date, address, description, source } = req.body;
  console.log(req.body);
  let sql = "INSERT INTO Siren.Sirens (lat, lng, date, address, description, source) VALUES (?, ?, ?, ?, ?, ?);";
  sql = mysql.format(sql, [ lat, lng, date, address, description, source ])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

module.exports = {
  getSirensByDateRange,
  getSirensByID,
  addSiren
}