const { MessageAttachment, MessageEmbed } = require('discord.js');
const { closestMatch } = require('closest-match');
const fs = require('node:fs');

/**
 * @description Returns an embed with the image of the role's card
 * @param {String} gameName name of the game
 * @param {String} roleName name of the role like in ./assets/ktulu/list.txt
 * @returns Embed object
 */

 function getGuideEmbed(gameName, roleName) {

	const files = fs.readdirSync(`./assets/${gameName}/jpg`).filter(file => file.endsWith('.jpg'));
	const bestMatch = closestMatch(roleName, files);
    const imageAttachment = new MessageAttachment(`./assets/${gameName}/jpg/${bestMatch}`);

    const guideEmbed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Znaleziona rola:')
	.setDescription('Miłej lektury (=')
	.setImage(`attachment://${bestMatch}`)
	.setTimestamp();

    return { embeds: [guideEmbed], files:[imageAttachment] };
}

module.exports = {
    getGuideEmbed,
};