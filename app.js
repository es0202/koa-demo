const Koa = require('koa')
const router = require('./routes')
const bodyParser = require('koa-bodyparser')
const path = require('path')
const staticFiles = require('koa-static')
const config = require('./config')
const app = new Koa()

app.use(staticFiles(path.join(__dirname, './public')))

//koa不能解析post请求参数,使用在router挂载前
app.use(bodyParser())

router(app)

app.listen(config.port, () => {
  console.log('server is running at http://localhost:' + config.port)
})