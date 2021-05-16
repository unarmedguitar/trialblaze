const { Botkit } = require('botkit');
const { MemoryStorage } = require('botbuilder');
const { TrovoAdapter } = require('botbuilder-adapter-trovo');
const dotenv = require('dotenv');
dotenv.config();

const adapter = new TrovoAdapter();

const controllerOptions = {
    adapter: adapter,
    disable_webserver: true,
    storage: new MemoryStorage(),
    version: require('./package.json').version,
}

const controller = new Botkit(controllerOptions);

controller.ready(() => {
    controller.loadModules(__dirname + '/features');
});