//  npm i express
const express = require('express');
const app = express();
app.get('/api/courses', (req, res) => {
  res.json([
    { name: 'web全栈', price: 8999 },
    { name: 'web高级', price: 8999 }])
})
app.listen(3000)