const http = require('http')
const url = require('url')
const qs = require('querystring')
module.exports = {
  get(path) {
    return new Promise((resolve, reject) => {
      let options = url.parse(path)
      console.log('[API GET]:', options)
      let req = http.request(options, res => {
        res.setEncoding('utf8')
        res.on('data', function(chunk) {
          resolve(JSON.parse(chunk))
        })
      })
      req.on('error', function(err) {
        reject(err)
      })
      req.end()
    })
  },
  post(path, params) {
    return new Promise((resolve, reject) => {
      let options = url.parse(path)
      options.method = 'POST'
      options.headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
      let postData = qs.stringify(params)
      console.log('[API POST]:', options)
      let req = http.request(options, res => {
        res.setEncoding('utf8')
        res.on('data', function(chunk) {
          resolve(JSON.parse(chunk))
        })
      })
      req.on('error', function(err) {
        reject(err)
      })
      req.write(postData)
      req.end()
    })
  }
}
