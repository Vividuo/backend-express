var express = require('express')
var router = express.Router()
const db = require('../utils/db')
const api = require('../utils/api')
/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const results = await db.query('SELECT * FROM `users` WHERE id = ?', [2])
    // await db.query('update users set password = ? where id = ?', ['newpass', 2])
    console.log('results', results.length, results)
    const user = results[0]
    res.render('index', { title: 'Express', user })
  } catch (err) {
    console.log('catch err', err)
    err.status = 520
    return next(err)
  }
})

router.get('/fetch', async function(req, res, next) {
  try {
    let json = await api.post('http://localhost:3000/data', {
      postData: 'postData'
    })
    res.json(json)
  } catch (err) {
    err.status = 500
    next(err)
  }
})

router.get('/data', function(req, res, next) {
  res.json({
    type: 'GET',
    text: 'This is a get request resource',
    num: 5
  })
})
router.post('/data', function(req, res, next) {
  // console.log('post data', req.body)
  res.json({
    type: 'POST',
    ...req.body
  })
})

router.get('/api', async function(req, res, next) {
  var redis = require('redis')
  var client = redis.createClient(6379, '47.75.55.239')
  // await client.set('string key', true, () => {
  //   console.log(1)
  // })
  // console.log(2)
  var str = 'default'
  await client.get('string key', (err, key) => {
    console.log(3, key)
    str = key
  })
  // console.log(4)

  res.json({
    code: '200',
    msg: '',
    data: {
      count: 1,
      str
    }
  })
})
module.exports = router
