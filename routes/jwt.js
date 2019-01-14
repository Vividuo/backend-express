var express = require('express')
var router = express.Router()
const db = require('../utils/db')
const api = require('../utils/api')
const config = require('config')
const jwt = require('jsonwebtoken')

router.use((req, res, next) => {
  console.log('TOKEN', req.query.token)
  const token = req.query.token
  const secret = config.get('jwt.secret')
  // TOKEN是否存在
  if (token) {
    // TOKEN是否过期

    // TOKEN是否合法
    let user = jwt.verify(token, secret)

    res.json(user)
  } else {
    let err = new Error()
    err.status = '401'
    throw err
  }
})

/* GET TOKEN */
router.get('/login', async function(req, res, next) {
  console.log('[Controller]:', 'JWT Login')
  // 验证用户名密码
  let user = {}
  if (!user) {
    console.log('[Controller]:', 'throw err')
    throw new Error('403')
  }
  console.log('[Controller]:', 'response')
  res.json({
    token: 'This is a token.'
  })
  // 生成TOKEN
})

/* GET USER INFO */
router.get('/info', async function(req, res, next) {})

module.exports = router
