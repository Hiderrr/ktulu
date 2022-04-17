const { SlashCommandBuilder } = require('@discordjs/builders');

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

        const array = rawString.replace(/ /g, '').split(',');

        let replymsg = '';
        array.forEach(element => {
            replymsg += element + '\n';
        });

        await interaction.reply(`You have selected:\n${replymsg}`);
    },
};