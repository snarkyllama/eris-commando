module.exports = class IEvent {
    constructor(client, {
        event = null
    }) {
        this.client = client;
        this.event = event;
    }
};