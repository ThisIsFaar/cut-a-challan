const express = require('express');
const app = express();
const path = require('path');

//where we expose files or directories for public use
// app.use(express.static(path.join(__dirname)));
app.use(express.static('public'));

//where we set our routes
app.get('/', function (req, res) {
  res.sendFile('public/index.html');
});

app.listen(process.env.PORT || 3000);
