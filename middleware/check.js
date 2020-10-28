const Crypto = require('crypto-js')
module.exports = {
  checkLogin: async (ctx, next) => {
    const cookie = ctx.cookies.get("cid")
    const original = Crypto.AES.decrypt(cookie, 'secret-key').toString(Crypto.enc.Utf8)
    if (!!cookie && !!original && !!JSON.parse(original).username) {
      await next();
    } else {
      return ctx.response.body = {
        Code: '999',
        Msg: 'please login first'
      }
    }
  }
}