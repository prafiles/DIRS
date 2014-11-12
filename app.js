var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config/config');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/getCommand', function (req, res) {
  console.log('Listener received GET from id=' + req.param("id"));
  //Respond with the command for the ID
  res.send('<Command>');
});

app.post('/postExecute', function (req, res) {
  console.log('POST from id=' + req.body.id + ' Output=' + req.body.out);
  res.send('Success');
});

var server = app.listen(config.serverPort, function () {
  console.log('server started on port ' + config.serverPort);
});
