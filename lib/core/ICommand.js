module.exports = class ICommand {
    constructor(client, {
        command = null,
        description = "No description?",
        usage = "No usages?",
        aliases = [],
        category = "General",
        guild = false,
        nsfw = false,
        owner = false,
        enabled = true
    }) {
        this.client = client;
        this.options = {
            command, description, usage, aliases,
            category, guild, nsfw, owner, enabled
        };
    }

    async execute(ctx, args) {}
};