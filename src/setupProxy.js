const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:9091',	// 서버 URL or localhost:설정한포트번호
            changeOrigin: true,
        })
    );
};