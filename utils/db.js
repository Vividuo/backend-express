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
  getConnection() {
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

  async transaction(callback) {
    return new Promise(async (resolve, reject) => {
      try {
        conn = await this.getConnection()
        await conn.beginTransaction()
        await callback(conn)
        console.log('transaction commit')
        await conn.commit()
        resolve(conn)
      } catch (err) {
        console.log('transaction rollback', err)
        await conn.rollback()
        reject(err)
      } finally {
        console.log('transaction release')
        conn.release()
      }
    })
  },

  // 执行sql
  async query(sql, params, connection = null) {
    const hasConnection = !!connection
    if (!hasConnection) {
      connection = await this.getConnection()
    }
    return new Promise((resolve, reject) => {
      connection.query(sql, params, (err, results, fields) => {
        if (err) {
          reject(err)
        }
        resolve(results)
      })
      if (!hasConnection) {
        connection.release()
      }
    })
  }
}
