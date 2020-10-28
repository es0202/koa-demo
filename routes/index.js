const router = require('koa-router')()
const HomeController = require('../controller/home')
const {
  checkLogin
} = require('../middleware/check')
module.exports = (app) => {
  router.post('/user/register', HomeController.register)
  router.post('/user/login', HomeController.login)
  // router.use(checkLogin)
  router.get('/user/test',checkLogin, HomeController.test)
  app.use(router.routes())
    .use(router.allowedMethods())
}