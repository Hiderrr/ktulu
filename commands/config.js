const { SlashCommandBuilder } = require('@discordjs/builders');
const { closestMatchChannel, resetUsedChannels } = require('../utils.js');
const sd = require('../shared_data.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('config')
	.setDescription('Configures the bot!')
    .addSubcommand(subcommand =>
		subcommand
			.setName('roles')
			.setDescription('Sets the role pool!')
			.addStringOption(option =>
                option.setName('rolenames')
                    .setDescription('Seperate rolenames by a comma. (ex. Herszt, Pastor)')
                    .setRequired(true))),
    async execute(interaction) {

        await resetUsedChannels(interaction);
        const rawString = interaction.options.getString('rolenames');

        const array = rawString.split(',').map(roleName => roleName.trim()).filter(roleName => roleName != '');

        if (array.length === 0) {
            return interaction.reply({ content: 'Specify at least one role u dummy!', ephemeral: true });
        }

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
            replymsg += name + ' -> ' + res.channel.name + '\n';
        }

        return interaction.reply({ content: `Matched roles:\n${replymsg}`, ephemeral: true });

    },
};