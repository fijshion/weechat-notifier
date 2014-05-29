var properties = {
  server:   '',
  port:     9000,
  password: '',
  ssl:      false,
  nick:     ''
};

var weechat = require('weechat');
var notify = require('osx-notifier');

var raise_notification = function(from, message) {

  notify({
    type: 'info',
    title: 'Weechat',
    subtitle: from,
    message: message,
    group: 'Weechat'
  });

};

var client = weechat.connect(properties.server, properties.port, properties.password, properties.ssl, function() {

  client.on('error', function(err) {
    console.error(err);
  });

  client.on('end', function() {
    console.log('end');
  });

  client.on('line', function(line) {
    console.log(line);
    var from = weechat.noStyle(line.prefix);
    var message = weechat.noStyle(line.message);

    if (message.indexOf(properties.nick) >= 0 && from.indexOf(properties.nick) == -1){
      raise_notification(from, message);
    }
  });

});

