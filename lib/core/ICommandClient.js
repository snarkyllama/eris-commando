const Eris = require('eris').Client;
const fs = require('fs');
const Collection = require('../util/Collection');
const Context = require('./IContext');

module.exports = class ICommandClient extends Eris {
    constructor(options = {}) {
        super(options.token, options.erisOptions);

        this.cmds = new Collection();
        this.owners = options.commandOptions.owners || [];
        this.prefix = options.commandOptions.prefix || '!';
        this.commandPath = options.commandOptions.commandPath;
        this.eventPath = options.commandOptions.eventPath;

        this.on('messageCreate', (msg) => this.handleCommand(msg));
    }

    async launch() {
        await this.load();
        this.connect();
    }

    async load() {
        const categories = await fs.readdirSync(this.commandPath);

        for (let i = 0; i < categories.length; i++) {
            fs.readdir(`${this.commandPath}/${categories[i]}`, (err, files) => {
                if (err) this.emit('commandoError', err);
                this.emit('commandoDebug', `Loading ${files.length} commands from category ${categories[i]}~`);
                files.forEach(f => {
                    try {
                        const Command = require(`${this.commandPath}/${categories[i]}/${f}`);
                        const cmd = new Command(this);

                        if (!cmd.options.enabled) return;

                        this.cmds.set(cmd.options.command, cmd);
                    } catch(err) {
                        this.emit('commandoError', err);
                    }
                });
            });
        }

        fs.readdir(this.eventPath, (err, files) => {
            if (err) this.emit('commandoError', err);
            this.emit('commandoDebug', `Loading ${files.length} events~`);
            files.forEach(f => {
                const Event = require(`${this.eventPath}/${f}`);
                const e = new Event(this);

                const doAsync = async(...args) => {
                    try {
                        await e.execute(...args);
                    } catch(err) {
                        this.emit('commandoError', err);
                    }
                };

                this.on(e.event, doAsync);
            });
        });
    }

    async handleCommand(msg) {
        if (msg.author.bot || !this.ready) return;

        const ctx = new Context(this, msg);

        let prefix = false;
        const mentionPrefix = new RegExp(`^<@!?${this.user.id}> `)
            .exec(msg.content);
        const prefixes = [this.prefix, `${mentionPrefix}`];

        for (const thisPrefix of prefixes) {
            if (msg.content.startsWith(thisPrefix)) prefix = thisPrefix;
        }

        if (!prefix) return;

        const args = msg.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift();
        const cmd = this.cmds.filter((c) => c.options.command === command || c.options.aliases.includes(command));

        if (!command) return;

        if (cmd[0].options.guild && msg.channel.type === 1) return;
        if (cmd[0].options.owner && !this.client.owners.includes(msg.author.id)) return;
        if (cmd[0].options.nsfw && !msg.channel.nsfw) return;

        try {
            this.emit('commandoRan', cmd);
            await cmd[0].execute(ctx, args);
        } catch(err) {
            this.emit('commandoCommandError', cmd, err);
        }
    }
};