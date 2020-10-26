const router = require('koa-router')()
const HomeController = require('../controller/home')
module.exports = (app) => {
  router.post('/user/register', HomeController.register)
  router.post('/user/login', HomeController.login)
  app.use(router.routes())
    .use(router.allowedMethods())
}