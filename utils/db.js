const mysql = require('mysql')
const config = require('config')
var createError = require('http-errors')
// 创建连接池
const pool = mysql.createPool({
  host: config.get('mysql.host'),
  port: config.get('mysql.port'),
  user: config.get('mysql.username'),
  password: config.get('mysql.password'),
  database: config.get('mysql.database')
})

module.exports = {
  // 获取连接
  _getConnection() {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, connection) => {
        if (error) {
          reject(error)
        } else {
          resolve(connection)
        }
      })
    })
  },

  // 执行sql
  async query(sql, params) {
    const connection = await this._getConnection()
    return new Promise((resolve, reject) => {
      connection.query(sql, params, (err, results, fields) => {
        if (err) {
          reject(err)
        }
        resolve(results)
      })
      connection.release()
    })
  }
}
