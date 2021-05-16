const https = require('https');

const wordwrap = str => str.match(/.{1,280}(\s|$)\S+?(\s|$)/g) || '';

const url = new URL('https://api.urbandictionary.com/v0/tooltip');

const getDefinition = function(term) {
    return new Promise((resolve, reject) => {
        url.searchParams.set('term', term);
        const request = https.get(url.href, response => {
            if (response.status < 200 || response.status > 299) {
                reject(new Error('Failed to get definition from Urban ' +
                    `Dictionary. Status code: ${response.status}`));
            }
            const content = [];
            response.on('data', chunk => content.push(chunk));
            response.once('end', () => {
                let def = JSON.parse(content.join('')).string;
                def = def.replace(/[\r\n\x0B\x0C\u0085\u2028\u2029]+/g, ' ');
                def = def.replace(/<[^>]+>|&quot;/g, '"');
                def = def.replace(/[\[\]]+/g, '');
                def = def.replace(/&apos;/g, "'");
                resolve(def);
            });
        });
        request.on('error', err => reject(err));
    });
};

module.exports = function(controller) {
    controller.hears([/^!ud\s/], ['message'], async(bot, message) => {
        if (message.args.length < 1) {
            return;
        }
        const term = message.args.join(' ');
        const definition = await getDefinition(term);
        if (definition.length > 300) {
            const defs = wordwrap(definition);
            for (const def of defs) {
                await bot.say(def);
                await controller.adapter.getPage().waitForTimeout(3500);
            }
        } else {
            await bot.say(definition);
        }
    });
};