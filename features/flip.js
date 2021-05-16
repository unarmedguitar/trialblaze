module.exports = function(controller) {
    controller.hears([/^!flip/], ['message'], async(bot, message) => {
        await bot.say(`The coin landed on ${Math.random() < 0.5 ? 
            'Heads' : 'Tails'}`);
    });
}