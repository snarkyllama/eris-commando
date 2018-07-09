const Commando = require('../../lib');

module.exports = class ReadyEvent extends Commando.Event {
    constructor(client) {
        super(client, {
            event: 'ready'
        });
    }

    execute() {
        console.log("Test Boat has logged in~");
    }
};