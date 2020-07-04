// -- Requiring modules
const chalk = require('chalk');
const { Client, Collection, MessageEmbed } = require('discord.js');
const { config } = require('dotenv');
const bot = new Client({ ws: { intents: ['GUILD_PRESENCES', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILDS', 'DIRECT_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'DIRECT_MESSAGE_REACTIONS'] } });
const mongoose = require('mongoose');
global.colours = require('./jsonFiles/colours.json');

global.MessageEmbed = MessageEmbed;


// -- Setting .env path
config({
	path: __dirname + '/.env',
});

try {
	process.env.owners = JSON.parse(process.env.OWNERS); // parsed owners from .env
}
catch (err) {
	process.env.owners = []; // placeholder
	console.log('Failed to load owners');
	console.error(err);
}

['aliases', 'commands', 'items'].forEach((x) => (bot[x] = new Collection()));
(async () => {
	const handlers = ['utils', 'command', 'event', 'items']
	for (var i = 0; i < handlers.length; i++) {
		const handler = handlers[i];
		try {
			await (require(`./handlers/${handler}`))(bot);
		}
		catch(err) {
			console.error(err);
			console.error(`${chalk.bgYellow('Failed')} loading handler ${chalk.bold(handler)}`);
		}
	}
})();

mongoose.connect(process.env.MONGOPASSWORD, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});


// ---Logging in with token or test token---
const token = process.env.TEST == 'true' ? process.env.TESTTOKEN : process.env.TOKEN;
bot.login(token);
