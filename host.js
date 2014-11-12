/**
 * Created by Prakhar on 11/13/2014.
 */

var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config/config');
var app = express();

var command = '';
var output = '';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/getCommand', function (req, res) {
  console.log('GET command from id=' + req.param("id"));
  var cmd = command.split(';');
  res.send(cmd[0]);
  command = '';
  for (var i = 1; i < cmd.length; i++) {
    command += cmd[i];
  }
});

app.post('/postExecute', function (req, res) {
  console.log('POST Execute Results from id=' + req.body.id
      + ' Error=' + req.body.error+ ' StdOut=' + req.body.stdout+ ' StdErr=' + req.body.stderr);
  res.send('Success');
});

app.get('/setCommand', function (req, res) {
  console.log('Listener received cmd=' + req.param("cmd"));
  command += ';' + req.param("cmd");
  res.send('Success');
});

app.get('/getOutput', function (req, res) {
  res.send(output);
  output = '';
});

var server = app.listen(config.serverPort, function () {
  console.log('server started on port ' + config.serverPort);
});
