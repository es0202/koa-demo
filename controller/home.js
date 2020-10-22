const {
  insertUser
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
        Code: -1,
        Msg: 'node success'
      }
    }).catch(err=>{
      console.log(err.message)
      ctx.response.body={
        Code:-1,
        Msg:'fail to register'
      }
    })
  }
}