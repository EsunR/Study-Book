const express = require('express');
const mysql = require('mysql');

var db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '66812652j',
  database: 'learn'
})

module.exports = function () {
  var router = express.Router();

  router.get('/get_banners', (req, res) => {
    db.query('SELECT * FROM banner_table', (err,data)=>{
      if(err){
        res.status(500).send('database error').end();
      }else{
        res.send(data).end();
      }
    })
  })

  return router;

}