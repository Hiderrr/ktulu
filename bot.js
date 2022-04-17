const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');

const { token, guildId } = require('./config.json');

const client = new Client({ intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES ] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.mainKtuluTextName = 'general';
client.mainKtuluVcName = 'ktulu';

client.usedChannels = new Array();
client.ktuluVcMembers = new Array();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log(`Running ${client.user.tag}!`);

    client.guild = client.guilds.cache.get(guildId);
    client.mainKtuluText = client.guild.channels.cache.find(
        channel => (channel.name == client.mainKtuluTextName && channel.type == 'GUILD_TEXT'),
    );
    client.mainKtuluVc = client.guild.channels.cache.find(
        channel => (channel.name == client.mainKtuluVcName && channel.type == 'GUILD_VOICE'),
    );
    client.usedCategory = client.guild.channels.cache.find(
        channel => (channel.name == 'USED' && channel.type == 'GUILD_CATEGORY'),
    );
    client.unusedCategory = client.guild.channels.cache.find(
        channel => (channel.name == 'UNUSED' && channel.type == 'GUILD_CATEGORY'),
    );
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

    if (interaction.channel != client.mainKtuluText) {
        interaction.reply({ content: `You can only use this command in #${client.mainKtuluTextName}!`, ephemeral: true });
        return;
    }

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
        await command.execute(interaction);
    }
    catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        console.log('There was an error executing the command');
	}
});

client.login(token);