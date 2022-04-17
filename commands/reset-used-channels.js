const { SlashCommandBuilder } = require('@discordjs/builders');
const { resetUsedChannels } = require('../utils.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('reset-used-channels')
    .setDescription('Moves all the channels from USED category into UNUSED'),
    async execute(interaction) {
        resetUsedChannels(interaction);
    },
};