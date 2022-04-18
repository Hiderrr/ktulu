const { SlashCommandBuilder } = require('@discordjs/builders');
const { getGuideEmbed } = require('../ktulu-utils');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('get-guide')
    .setDescription('Gives you the guide for your role!')
    .addStringOption(option =>
        option.setName('game')
            .setDescription('which game?')
            .addChoice('ktulu', 'ktulu')
            .addChoice('mafia', 'mafia')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('rolename')
            .setDescription('siema')
            .setRequired(true)),
    async execute(interaction) {
        const gameName = interaction.options.getString('game');
        const roleName = interaction.options.getString('rolename');
        const data = getGuideEmbed(gameName, roleName);
        await interaction.reply({ content: 'check your DM! :smirk:', ephemeral: true });
        interaction.user.send(data);
    },
};