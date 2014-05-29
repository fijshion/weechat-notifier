#!/usr/bin/env node

var weechat = require('weechat'),
    notify  = require('osx-notifier'),
    client;

var properties = {
  server:   process.env.SERVER,
  port:     process.env.PORT,
  password: process.env.PASSWORD,
  ssl:      false,
  nicks:    process.env.NICKS.split(',')
};

var raiseNotification = function(from, message) {
  notify({
    type: 'info',
    title: 'WeeChat',
    subtitle: from,
    message: message,
    group: 'WeeChat'
  });
};

var connect = function() {
  return weechat.connect(properties.server, properties.port, properties.password, properties.ssl, function() {
    console.log('Connected.');
  });
};

client = connect();

client.on('line', function(line) {
  var from = weechat.noStyle(line.prefix);
  var message = weechat.noStyle(line.message);

  if (['@', '+'].indexOf(from[0]) !== -1) {
    from = from.slice(1);
  }

  var containsNick = properties.nicks.some(function(nick) {
    return message.indexOf(nick) !== -1;
  });
  var isSelf = properties.nicks.some(function(nick) {
    console.log("checking", nick, from);
    return nick === from;
  });
  var isPrivate = line.tags_array.indexOf('notify_private') !== -1;
  var isValid = line.tags_array.indexOf('irc_mode') !== -1
      || line.tags_array.indexOf('notify_message') !== -1;

  // Make sure the message is either a highlight or a PM:
  if ((!isSelf && containsNick && isValid) || isPrivate) {
    raiseNotification(from, message);
  }
});
