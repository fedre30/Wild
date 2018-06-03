const express = require('express')
const app = express()

const expressVueMiddleware = expressVue.init()
app.use(expressVueMiddleware)

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept')
  next()
})

const score = fetch('http://localhost:3000/score').then(res => res.json()).then(json => alert(json))
app.get('/score', (req, res) => {
  res.send(score)
})

app.listen(3000, () => console.log('Hello'))

//fetch('http://localhost:3000/score').then(res => res.json()).then(json => console.log(json))
