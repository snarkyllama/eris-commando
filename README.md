# eris-commando
[`eris-commando`](https://npmjs.com/package/eris-commando) is a Command Framework for the [Eris](https://abal.moe/Eris) library.

**If you wanna use the framework, you can do so by:**
```sh
# Yarn
$ yarn add eris-commando

# NPM
$ npm i eris-commando
```

## Options
* prefix => The command prefix (`String|string`)
* owners => The owners of the bot (`Array<String>`)
* groupedCommands => If you want the commands to be grouped. (`Boolean|boolean`) (Default is `true`)
* commandPath => The command path so [fs](https://nodejs.org/api/fs.html) can access it (`String|string`)
* eventPath => The event path so [fs](https://nodejs.org/api/fs.html) can access it (`String|string`)

## Notes / Examples
### Notes
* You must use a `String` for the category or it will error. Default category is `General`.
* Aliases must be in an array or it will error.
* If you wanna disable an command from loading, you must do `enabled = false` in the constructor of your command.
* You must have Node v7+ since the framework uses `async/await`.

### Examples
```js
const Commando = require('eris-commando');

const client = new Commando.Client({
    token: "token",
    erisOptions: {
        // Eris' options.
    },
    commandOptions: {
        // Our options
    }
});

client.launch();
```
```js
const Commando = require('eris-commando');

module.exports = class MyCommand extends Commando.Client {
    constructor(client) {
        super(client, {
            command: 'name',
            description: "description",
            usage: 'usage',
            aliases: [],
            category: "Category",
            nsfw: false,
            owner: false,
            guild: true,
            enabled: true
        });
    }

    async execute(ctx, args) {
        if (!args[0]) return ctx.send("You didn't provide enought arguments!");
        return ctx.send(args.join(" "));
    }
}
```
```js
const Commando = require("eris-commando");

module.exports = class MyEvent extends Commando.Event {
    constructor(client) {
        super(client, {
            event: 'guildCreate'
        });
    }

    execute(guild) {
        console.log(`I joined ${guild.name}~`);
    }
}
```
