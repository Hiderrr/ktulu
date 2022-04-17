const { SlashCommandBuilder } = require('@discordjs/builders');
const { getGuideEmbed } = require('../utils.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('get-guide')
    .setDescription('Gives you the guide for your role!')
    .addStringOption(option =>
        option.setName('rolename')
                .setDescription('siema')
                .setRequired(true)),
    async execute(interaction) {
        const rawString = interaction.options.getString('rolename');
        const data = getGuideEmbed(rawString);
        await interaction.user.send(data);
    },
};