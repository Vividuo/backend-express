var express = require('express')
var router = express.Router()

let timestamp = 0
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now())
  timestamp = Date.now()
  next()
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource, ' + timestamp)
})

module.exports = router
