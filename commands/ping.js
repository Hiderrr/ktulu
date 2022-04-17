const { SlashCommandBuilder } = require('@discordjs/builders');
const sd = require('../shared_data');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong!'),
    async execute(interaction) {
        await interaction.reply(`Pong! It only took: ${Date.now() - interaction.createdTimestamp} ms! API Latency is ${Math.round(sd.client.ws.ping)}ms!`);
    },
};