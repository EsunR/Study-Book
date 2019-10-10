var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017'
var dbName = 'koa'

const client = new MongoClient(url, { useUnifiedTopology: true })
client.connect(err => {
  const db = client.db(dbName)
  var result = db.collection("user").find({})
  result.toArray((err, doc) => {
    console.log(doc);
    // client.close()
  })
})

// let connect = function () {
//   return new Promise(resolve => {
//     client.connect(err => {
//       if (err) {
//         console.log(err);
//         return
//       } else {
//         resolve()
//       }
//     })
//   })
// }

// connect().then(() => {
//   var result = client.db(dbName).collection("user").find({})
//   result.toArray((err, doc) => {
//     console.log(doc);
//     client.close()
//   })
// })


