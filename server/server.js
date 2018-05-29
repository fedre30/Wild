const express = require('express')
const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/score', (req, res) => {
  res.send({a: 1})
})

app.listen(3000, () => console.log('Hello'))

//fetch('http://localhost:3000/score').then(res => res.json()).then(json => console.log(json))
