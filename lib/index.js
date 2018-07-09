module.exports = {
    Client: require('./core/ICommandClient'),
    Command: require('./core/ICommand'),
    Context: require('./core/IContext'),
    Event: require('./core/IEvent'),
    version: require('../package.json').version
};