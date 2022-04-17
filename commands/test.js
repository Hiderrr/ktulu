const { SlashCommandBuilder } = require('@discordjs/builders');
// const { Collection } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Gives you a list of channels from a given category'),
    async execute(interaction) {
        // debugging because shit doesnt work
        const x = interaction.client.guild.channels.cache.find(channel => (channel.name == interaction.client.mainKtuluVcName && channel.type == 'GUILD_VOICE'));
        console.log(x.members);

        // Should work, but when either are empty weird shit happens
        // if once empty then it stays at that value forever
        interaction.client.usedChannels = Array.from(interaction.client.guild.channels.cache.find(channel => channel.name == 'USED' && channel.type == 'GUILD_CATEGORY').children.values());
        interaction.client.ktuluVcMembers = Array.from(interaction.client.mainKtuluVc.members.values());

        if (interaction.client.ktuluVcMembers.length < interaction.client.usedChannels.length) {
            return interaction.reply({ content: 'Not enough people in vc!', ephemeral: true });
        }

        return interaction.reply({ content: 'ez!', ephemeral: true });
    },
};