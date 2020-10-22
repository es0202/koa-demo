const router = require('koa-router')()
const HomeController = require('../controller/home')
module.exports = (app) => {
  router.post('/user/register', HomeController.register)

  app.use(router.routes())
    .use(router.allowedMethods())
}