#!/usr/bin/env node

var weechat = require('weechat');
var notifier = require('node-notifier');
var client;
var argv = require('yargs').argv;

if (!argv.server || !argv.port || !argv.password || !argv.nicks) {
  console.error(
    'Usage: node index.js --server=<server> --port=<port> ' +
    '--password=<password> --nicks=<nicks> --ssl=<true|false>');
  return 0;
}

var properties = {
  server: argv.server,
  port: argv.port,
  password: argv.password,
  ssl: argv.ssl,
  nicks: argv.nicks.split(',')
};

var raiseNotification = function(from, message) {
  notifier.notify({
    title: from,
    message: message,
  });
};

var connect = function() {
  return weechat.connect(
    properties.server,
    properties.port,
    properties.password,
    properties.ssl,
    function() {
      console.log('Connected.');
      notifier.notify({
        title: 'Weechat Relay Connected.',
        message: ''
      });
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
    return nick === from;
  });
  var isPrivate = line.tags_array.indexOf('notify_private') !== -1;
  var isValid = line.tags_array.indexOf('irc_mode') !== -1 ||
    line.tags_array.indexOf('notify_message') !== -1;

  // Make sure the message is either a highlight or a PM:
  if ((!isSelf && containsNick && isValid) || isPrivate) {
    raiseNotification(from, message);
  }
});
