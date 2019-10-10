var config = require('./config')
var MongoClient = require('mongodb').MongoClient

class Db {
  constructor() {
    this.client = null
    this.db = null
    this.connect()
  }

  /**
   * @returns {Db}
   */
  static getInstance() {
    if (!Db.instance) {
      return Db.instance = new Db()
    } else {
      return Db.instance
    }
  }

  /**
   * 连接数据库
   */
  connect() {
    // 只连接一次（单个实例只连接一次）
    return new Promise((resolve, reject) => {
      if (this.client === null) {
        // 如果没有创建连接，就连接数据库
        MongoClient.connect(config.dbUrl, { useUnifiedTopology: true }, (err, client) => {
          if (err) {
            reject(err)
            return
          } else {
            this.client = client
            this.db = this.client.db(config.dbName)
            console.log("数据库连接成功")
            resolve()
          }
        })
      } else {
        // 如果已经连接上数据库就不再连接
        resolve()
      }
    })
  }

  /**
   * 查询表
   * @param {String} collection 
   * @param {JSON} json 查询的条件
   */
  find(collection, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(() => {
        let result = this.db.collection(collection).find(json)
        result.toArray((err, docs) => {
          if (err) {
            reject(err)
            return
          } else {
            resolve(docs)
          }
        })
      }).catch((err) => {
        reject(err)
        return
      })
    })
  }

  /**
   * 插入一条数据
   * @param {String} collectionName 
   * @param {JSON} data 
   */
  insert(collectionName, data) {
    return new Promise((resolve, reject) => {
      this.connect().then(() => {
        this.db.collection(collectionName).insertOne(data, (err, result) => {
          if (err) reject(err)
          resolve(result)
        })
      }).catch(err => {
        reject(err)
      })
    })
  }

  /**
   * 修改一条数据
   * @param {String} collectionName 
   * @param {JSON} originData 
   * @param {JSON} newData 
   */
  update(collectionName, originData, newData) {
    return new Promise((resolve, reject) => {
      this.connect().then(() => {
        this.db.collection(collectionName).updateOne(originData, {
          $set: newData
        }, (err, result) => {
          if (err) reject(err)
          resolve(result)
        })
      }).catch(err => {
        reject(err)
      })
    })
  }

  /**
   * 删除一条数据
   * @param {String} collectionName 
   * @param {JSON} data 
   */
  remove(collectionName, data) {
    return new Promise((resolve, reject) => {
      this.connect().then(() => {
        this.db.collection(collectionName).deleteOne(data, (err, result) => {
          if (err) reject(err)
          resolve(result)
        })
      }).catch(err => {
        reject(err)
      })
    })
  }
}

module.exports = Db.getInstance()