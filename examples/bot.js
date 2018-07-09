const Commando = require('../lib');
const config = require('./config.json');
const path = require('path');

new Commando.Client({
    token: config.token,
    erisOptions: {
        disableEveryone: true,
        autoreconnect: true
    },
    commandOptions: {
        prefix: config.prefix,
        commandPath: path.join(__dirname, 'commands'),
        eventPath: path.join(__dirname, 'events'),
        owners: ['280158289667555328']
    }
}).launch();