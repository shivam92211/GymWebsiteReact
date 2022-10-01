const express = require('express');
const path = require('path');
const app = express();
const cors = require("cors");

// Middlewares 
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

// Get requests 
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', "index.html"))
});


// Post requests 
app.post("/submit", (req, res) => {
  console.log(req.body);
  setTimeout(()=>
  res.send({err: "1", msg: "Congrats!! Check your email to activate account."}),
  // status going to be successful =0 , error = 1, pending = 2..
  3000);
})

// Start the server 
app.listen(80, () => {
  console.log('server is running on port 80')
});