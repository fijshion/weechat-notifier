weechat-notifier
================

WeeChat notifications on OS X using Weechat relay protocol.


### Installation

Enable relay in WeeChat with the command: 

    /relay add weechat PORT

You need to export the variables SERVER, PASSWORD, PORT and NICKS (comma-separated).
Then install with: 

    npm install -g weechat-notifier
    
    # Or:
    
    git clone git@github.com:eirsyl/weechat-notifier.git
    npm install 
    node index.js

### launchd

If you want weechat-notifier to run on startup you can add it as a launchd-plist (~/Library/LaunchAgents). A template can be found [here](https://gist.github.com/ekmartin/05b794ac1a2eaa803ff0).
