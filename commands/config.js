const { SlashCommandBuilder } = require('@discordjs/builders');
const { closestMatchChannel, resetUsedChannels } = require('../utils.js');
const sd = require('../shared_data.js');

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
                    .setDescription('Seperate rolenames by a comma. (ex. Herszt, Pastor)')
                    .setRequired(true))),
    async execute(interaction) {
        resetUsedChannels(interaction);

        const rawString = interaction.options.getString('rolename');

        // Split by ',' and erase any empty entries.
        // Entries that are more than one space will get through,
        // but it's fine because this system is designed to spellcheck not predict
        // and pretty much no human will ever type in only two spaces unless you're a moron.
        const array = rawString.split(',').filter(word => word != '' && word != ' ');

        const channels = Array.from(sd.unusedCategory.children.values())
            .concat(Array.from(sd.usedCategory.children.values()));

        let replymsg = '';

        for (const name of array) {
            const res = closestMatchChannel(name, channels);

            // Initial entry -> closest Match
            if (sd.logNonErrors) console.log(name + ' -> ' + res.channel.name);
            res.channel.setParent(sd.usedCategory, { lockPermissions: true });
            // making sure channel isn't going to be matched more than once
            channels.splice(res.index, 1);
            replymsg += res.channel.name + '\n';
        }

        await interaction.reply(`You have selected:\n${replymsg}`);

    },
};