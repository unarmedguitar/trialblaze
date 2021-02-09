const { chatType } = require('botbuilder-adapter-trovo');
module.exports = function(controller) {
    controller.on(Object.keys(chatType), async(bot, message) => {
        console.info(message.incoming_message);
    });
}