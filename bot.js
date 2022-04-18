const fs = require('node:fs');
const { Client, Intents } = require('discord.js');
const { token, guildId } = require('./config.json');
const sd = require('./shared_data.js');

sd.client = new Client({ intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES ] });

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
	sd.commands.set(command.data.name, command);
}

sd.client.once('ready', () => {
    console.log(`Running ${sd.client.user.tag}!`);

    sd.guild = sd.client.guilds.cache.get(guildId);

    // Setting some useful references
    sd.mainKtuluText = sd.guild.channels.cache.find(
        channel => (channel.name == sd.mainKtuluTextName && channel.type == 'GUILD_TEXT'),
    );
    sd.mainKtuluVc = sd.guild.channels.cache.find(
        channel => (channel.name == sd.mainKtuluVcName && channel.type == 'GUILD_VOICE'),
    );
    sd.usedCategory = sd.guild.channels.cache.find(
        channel => (channel.name == 'USED' && channel.type == 'GUILD_CATEGORY'),
    );
    sd.unusedCategory = sd.guild.channels.cache.find(
        channel => (channel.name == 'UNUSED' && channel.type == 'GUILD_CATEGORY'),
    );
});

sd.client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

    if (interaction.channel != sd.mainKtuluText) {
        interaction.reply(`You can only use this command in #${sd.mainKtuluTextName}!`);
        return;
    }

	const command = sd.commands.get(interaction.commandName);

	if (!command) return;

	try {
        await command.execute(interaction);
    }
    catch (error) {
		console.error(error);
		await interaction.reply('There was an error while executing this command!');
        console.log('There was an error executing the command');
	}
});

sd.client.login(token);