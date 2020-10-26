const {
  insertUser,
  findUserData
} = require('../utils/mysql')
const md5 = require('md5')

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

  }
}