var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017'
var dbName = 'koa'

const client = new MongoClient(url, { useNewUrlParser: true })
client.connect(err => {
  const db = client.db(dbName)
  db.collection("user").insertOne({
    "name": "花花",
    "age": "18"
  }, (err, result) => {
    client.close()
  })
})