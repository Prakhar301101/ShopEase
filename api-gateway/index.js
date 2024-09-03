require('dotenv').config();
const express = require('express');
const app = express();
const { createProxyMiddleware,fixRequestBody } = require('http-proxy-middleware');
const PORT = process.env.PORT;
const rateLimiter=require('./middleware/rate-limitter');

app.use(express.json());


app.get('/info', (req, res) => {
  res.json({ 
    message: 'We are at the Gateway',
    PORT });
});

const AUTH_SERVICE = 'http://localhost:5001';
const PRODUCT_SERVICE = 'http://localhost:5002';
const CART_SERVICE = 'http://localhost:5003';
const ORDER_SERVICE = 'http://localhost:5004';
const PAYMENT_SERVICE = 'http://localhost:5005';

app.use(rateLimiter);
app.use(
  '/api/auth',
  createProxyMiddleware({
    target: AUTH_SERVICE,
    changeOrigin: true,
    on: {
      proxyReq: fixRequestBody
    },
  })
);

app.use(
  '/api/products',
  createProxyMiddleware({
    target: PRODUCT_SERVICE,
    changeOrigin: true,
    on: {
      proxyReq: fixRequestBody
    },
  })
);
app.use(
  '/api/cart',
  createProxyMiddleware({ target: CART_SERVICE, changeOrigin: true })
);
app.use(
  '/api/order',
  createProxyMiddleware({ target: ORDER_SERVICE, changeOrigin: true })
);
app.use(
  '/api/payment',
  createProxyMiddleware({ target: PAYMENT_SERVICE, changeOrigin: true })
);

app.listen(PORT, () => {
  console.log(`Gateway listening at PORT:${PORT}`);
});
