const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = app => {
    app.use('/customer', 
        createProxyMiddleware(
            {
                target: 'http://localhost:5000',
                changeOrigin: true,
            }
        )
    );
    app.use('/image', 
        createProxyMiddleware(
            {
                target: 'http://localhost:5000',
                changeOrigin: true,
            }
        )
    );
}