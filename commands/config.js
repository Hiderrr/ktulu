const { SlashCommandBuilder } = require('@discordjs/builders');
const { closestMatchChannel } = require('../utils.js');

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
                    .setDescription('Doesnt have to be exact we have a cool algo :sunglasses:')
                    .setRequired(true))),
    async execute(interaction) {
        const rawString = interaction.options.getString('rolename');

        const array = rawString.split(',');

        let replymsg = '';
        array.forEach(element => {
            replymsg += element + '\n';
        });

        const channels = Array.from(interaction.client.unusedCategory.children.values())
            .concat(Array.from(interaction.client.usedCategory.children.values()));

        for (const name of array) {
            const res = closestMatchChannel(name, channels);

            console.log(channels[res.index].name);
            channels.splice(res.index, 1);
            console.log(res.channel.name);
        }

        await interaction.reply(`You have selected:\n${replymsg}`);
    },
};