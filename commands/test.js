const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Gives you a list of channels from a given category'),
    async execute(interaction) {

        const usedChannels = Array.from(interaction.client.usedCategory.children.values());
        const ktuluVcMembers = Array.from(interaction.client.mainKtuluVc.members.values());

        if (ktuluVcMembers.length < usedChannels.length) {
            return interaction.reply({ content: 'Not enough people in vc!', ephemeral: true });
        }

        return interaction.reply({ content: 'ez!', ephemeral: true });
    },
};