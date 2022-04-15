const config = require('./config');

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
	console.log(`Running ${client.user.tag}!`);
});

client.login(config.token);