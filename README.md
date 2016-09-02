Fork of https://github.com/eirsyl/weechat-notifier

This version uses [node-notifier](https://github.com/mikaelbr/node-notifier) to enable notifications on more platforms.

weechat-notifier
================

WeeChat notifications using Weechat relay protocol.


### Installation

Enable relay in WeeChat with the command: 

    /set relay.network.password "your password"
    /relay add weechat PORT

Then install with: 

    git clone git@github.com:fijshion/weechat-notifier.git
    npm install 

### Usage:

    node index.js --server=<server> --port=<port> --password=<password> --nicks=<nicks> --ssl=<true|false>
