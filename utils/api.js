const http = require('http')
const url = require('url')
const qs = require('querystring')
module.exports = {
  get(urlStr) {
    return new Promise((resolve, reject) => {
      let options = url.parse(urlStr)
      options.method = 'GET'
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
  post(urlStr, data) {
    return new Promise((resolve, reject) => {
      let options = url.parse(urlStr)
      options.method = 'POST'
      options.headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
      let postData = qs.stringify(data)
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
