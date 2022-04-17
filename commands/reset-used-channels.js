const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('reset-used-channels')
    .setDescription('Moves all the channels from USED category into UNUSED'),
    async execute(interaction) {

        const usedChannels = Array.from(interaction.client.usedCategory.children.values());
        usedChannels.forEach(usedChannel => {
            usedChannel.setParent(interaction.client.unusedCategory, { lockPermissions: true })
            .catch(err => {
                console.log(err);
                return interaction.reply('An error occured!');
            });
        });

        return interaction.reply('Done!');

    },
};