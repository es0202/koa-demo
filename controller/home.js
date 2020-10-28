const {
  insertUser,
  findUserData
} = require('../utils/mysql')
const md5 = require('md5')
const Crypto = require('crypto-js')

module.exports = {
  register: async (ctx, next) => {
    let {
      username,
      password
    } = ctx.request.body
    await insertUser({
      username: username,
      password: md5(password),
      register_time: new Date()
    }).then(data => {
      ctx.response.body = {
        Code: 0,
        Msg: 'register success'
      }
    }).catch(err => {
      console.log(err.message)
      ctx.response.body = {
        Code: -1,
        Msg: err.message
      }
    })
  },
  login: async (ctx, next) => {
    let {
      username,
      password
    } = ctx.request.body
    const user = await findUserData(username)
    if (user.length == 1) {
      if (user[0].password == md5(password)) {
        const obj={username:username}
        ctx.cookies.set(
          'cid',
          Crypto.AES.encrypt(JSON.stringify(obj), 'secret-key').toString(), {
            domain: 'localhost', // 写cookie所在的域名
            path: '/', // 写cookie所在的路径
            maxAge: 10 * 60 * 1000, // cookie有效时长
            expires: new Date().getDate() + 1, // cookie失效时间
            httpOnly: false, // 是否只用于http请求中获取
            overwrite: false // 是否允许重写
          }
        )
        ctx.response.body = {
          Code: 0,
          Msg: 'login success'
        }
      } else {
        ctx.response.body = {
          Code: 1,
          Msg: 'account or password is wrong'
        }
      }
    } else {
      ctx.response.body = {
        Code: -1,
        Msg: 'please register first!'
      }
    }

  },
  test: async (ctx, next) => {
    ctx.response.body = {
      Code: 0,
      Msg: 'test test test'
    }
  }
}