var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();
app.use(express.static(path.join(__dirname, "/html")));
app.use(bodyParser.json());

app.post('/signin', function (req, res) {
  var user_name = req.body.email;
  var password = req.body.password;
  console.log("here")
  console.log(user_name)
  console.log(password)
  if (user_name == 'admin' && password == 'admin') {
    res.send('success');
  }
  else {
    res.send('Failure');
  }
})

app.listen(8000, function () {
  console.log("Started listening on port", 8000);
})

axios.defaults.baseURL = 'http://myurl';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';