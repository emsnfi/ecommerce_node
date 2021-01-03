// app.js
// import modules
const express = require('express')
const app = express()
const port = 8080
var mysql = require('mysql');
var mc = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root506411",
  insecureAuth : true,
  database : 'ecommerce'
});

mc.connect();


// route setting
app.get('/', (req, res) => {
  res.send('This is my first Express app')
})



// create server
app.listen(port, () => {
  console.log(`server listen to http://localhost:${port}`)
})