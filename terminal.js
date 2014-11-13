var readline = require('readline');
var request = require('request');
var config = require('./config/config');

var input = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Type exit() to exit.');

setInterval(function () {
  request({
    uri: 'http://' + config.serverLocation + ':' + config.serverPort + '/getOutput/',
    method: "GET",
    timeout: 1000,
    followRedirect: true,
    maxRedirects: 3
  }, function (error, response, body) {
    if (error)
      console.log(error);
    else if (body != '') {
      console.log(body);
      prompt();
    }
  });
}, 1000);

prompt();
function prompt() {
  input.question(config.clientId + config.prompt, function (answer) {
    if (answer == 'exit()')
      process.exit(0);
    else {
      sendRequest(answer);
    }
  });
}

function sendRequest(command) {
  request({
    uri: 'http://' + config.serverLocation + ':' + config.serverPort + '/setCommand/?cmd=' + command,
    method: "GET",
    timeout: 1000,
    followRedirect: true,
    maxRedirects: 3
  }, function (error, response, body) {
    if (error)
      console.log(error);
    else if (body != 'Success')
      console.log('Shit happens.');
  });
}
