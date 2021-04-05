const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/__',
    createProxyMiddleware({
      target: 'https://euro2021-3d006.web.app/',
      changeOrigin: true,
    }),
  )
}
