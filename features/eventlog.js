const { chatType } = require('botbuilder-adapter-trovo');

module.exports = {
    active: true,
    name: 'eventlog',
    description: 'Display all incoming messages inside the console',
    author: {
        name: 'unarmedguitar',
        url: 'https://github.com/unarmedguitar/trialblaze/tree/main/features/eventlog.js',
    },
    license: 'MIT',
    default: function(controller) {
        if (!this.active) {
            return;
        }
        controller.on(Object.keys(chatType), async(bot, message) => {
            console.log(message.incoming_message);
        });
    }
};