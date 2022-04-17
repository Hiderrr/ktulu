const { SlashCommandBuilder } = require('@discordjs/builders');
const { closestMatchChannel, resetUsedChannels } = require('../utils.js');
const { client } = require('../bot.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('config')
	.setDescription('Configures the bot!')
    .addSubcommand(subcommand =>
		subcommand
			.setName('add')
			.setDescription('Adds a role to the pool!')
			.addStringOption(option =>
                option.setName('rolename')
                    .setDescription('Seperate rolenames by comma. (ex. Herszt, Pastor)')
                    .setRequired(true))),
    async execute(interaction) {
        resetUsedChannels(interaction);

        const rawString = interaction.options.getString('rolename');

        const array = rawString.split(',');

        const channels = Array.from(client.unusedCategory.children.values())
            .concat(Array.from(client.usedCategory.children.values()));

        let replymsg = '';

        for (const name of array) {
            const res = closestMatchChannel(name, channels);

            console.log(name + ' -> ' + res.channel.name);
            channels.splice(res.index, 1);
            replymsg += res.channel.name + '\n';
        }

        await interaction.reply(`You have selected:\n${replymsg}`);
    },
};