const Commando = require('../../../lib');

module.exports = class MyCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            command: 'test',
            description: 'Just a test command.',
            usage: 'test',
            aliases: [
                'debug'
            ],
            category: "Test"
        });
    }

    execute(ctx, args) {
        if (!args[0]) return ctx.send("No arguments added?");
        return ctx.send(args.join(" "));
    }
};