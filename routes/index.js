var express = require('express')
var router = express.Router()
const db = require('../utils/db')
const api = require('../utils/api')
const config = require('config')
const jwt = require('jsonwebtoken')

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
    // let json = await api.post('http://localhost:3000/data', {
    //   postData: 'postData'
    // })
    let json = await api.get('http://localhost:3000/data', {
      getData: 'getData'
    })
    res.json(json)
  } catch (err) {
    err.status = 500
    next(err)
  }
})
router.get('/transaction', async function(req, res, next) {
  try {
    let result1 = null
    let result2 = null
    await db.transaction(async connection => {
      result1 = await db.query(
        'update users set password = ? where id = ?',
        ['newpass4', 2],
        connection
      )
      result2 = await db.query(
        'SELECT * FROM `users` WHERE id = ?',
        [2],
        connection
      )
    })
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
})

router.get('/data', function(req, res, next) {
  //
  res.json({
    type: 'GET',
    text: 'This is a get request resource',
    num: 5,
    ...req.query
  })
})
router.post('/data', function(req, res, next) {
  // console.log('post data', req.body)
  res.json({
    type: 'POST',
    ...req.body
  })
})
router.get('/test', async function(req, res, next) {
  const users = await db.query('SELECT * FROM `users` WHERE id = ?', [2])
  const payload = {
    id: users[0].id,
    name: users[0].username
  }
  const secret = config.get('jwt.secret')
  const token = jwt.sign(payload, secret)
  res.json({
    secret,
    payload,
    token
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
