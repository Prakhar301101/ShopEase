require('dotenv').config();
const express = require('express');
const app = express();
const {
  createProxyMiddleware,
  fixRequestBody,
} = require('http-proxy-middleware');
const PORT = process.env.PORT;
const rateLimiter = require('./middleware/rate-limitter');

app.use(express.json());

app.get('/info', (req, res) => {
  res.json({
    message: 'We are at the Gateway',
    PORT,
  });
});

const AUTH_SERVICE = 'http://localhost:5001';
const PRODUCT_SERVICE = 'http://localhost:5002';
const CART_SERVICE = 'http://localhost:5003';
const CHECKOUT_SERVICE = 'http://localhost:5004';

app.use(rateLimiter);
app.use(
  '/api/auth',
  createProxyMiddleware({
    target: AUTH_SERVICE,
    changeOrigin: true,
    on: {
      proxyReq: fixRequestBody,
    },
  })
);

app.use(
  '/api/products',
  createProxyMiddleware({
    target: PRODUCT_SERVICE,
    changeOrigin: true,
    on: {
      proxyReq: fixRequestBody,
    },
  })
);
app.use(
  '/api/cart',
  createProxyMiddleware({
    target: CART_SERVICE,
    changeOrigin: true,
    on: {
      proxyReq: fixRequestBody,
    },
  })
);

app.use(
  '/api/checkout',
  createProxyMiddleware({
    target: CHECKOUT_SERVICE,
    changeOrigin: true,
    on: {
      proxyReq: fixRequestBody,
    },
  })
);

app.listen(PORT, () => {
  console.log(`Gateway listening at PORT:${PORT}`);
});
