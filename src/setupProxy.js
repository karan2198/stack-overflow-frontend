const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://stack-overflow-backend-qf3u.onrender.com/',
      changeOrigin: true,
      allowedHosts: ['*'],
    })
  );
};
