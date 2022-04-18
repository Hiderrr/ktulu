const { MessageAttachment, MessageEmbed } = require('discord.js');

/**
 * @description Returns an embed with the image of the role's card
 * @param {String} rolename name of the role <snake_case_faction>_<snake_case_name> like in ./assets/ktulu/list.txt
 * @returns Embed object
 */

 function getGuideEmbed(rolename) {
    const file = new MessageAttachment(`./assets/ktulu/jpg/${rolename}.jpg`);

    const guideEmbed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`Jesteś ${rolename}!`)
	.setDescription('Miłej Gry')
	.setImage(`attachment://${rolename}.jpg`)
	.setTimestamp();

    return { embeds: [guideEmbed], files:[file] };
}

module.exports = {
    getGuideEmbed,
};