module.exports = class IContext {
    constructor(_client, msg) {
        Object.assign(this, msg);
        this.client = _client;
    }

    get guild() {
        return this.channel.guild;
    }

    send(content) {
        if (content instanceof Object) {
            this.channel.createMessage({
                embed: content
            });
        } else {
            this.channel.createMessage(content);
        }
    }
};