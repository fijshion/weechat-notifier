weechat-notifier
================

WeeChat notifications on OSX using Weechat relay protocol.


### Installation

    git clone git@github.com:eirsyl/weechat-notifier.git
    npm install 
    # Export SERVER, PASSWORD and NICKS (comma-separated) before running.
    node index.js

### launchd

If you want weechat-notifier to run on startup you can add it as a launchd-plist (~/Library/LaunchAgents). A template can be found [here](https://gist.github.com/ekmartin/05b794ac1a2eaa803ff0).
