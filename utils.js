/* eslint-disable no-unused-vars */
const { closestMatch } = require('closest-match');
const { GuildChannel, Interaction, MessageAttachment, MessageEmbed } = require('discord.js');

const sd = require('./shared_data.js');

/**
 * @description Gives you the closest match between the input and a channel name.
 * @param {string} expectedName
 * Expected channel name
 * @param {Array<GuildChannel>} candidateChannels
 * Array of channels to be considered
 * @returns
 * Channel which name is the best match with expectedName and its position in candidateChannels
*/

function closestMatchChannel(name, candidateChannels) {

    const channelNames = candidateChannels.map(channel => channel.name);
    const bestMatch = closestMatch(name, channelNames);

    for (let i = 0; i < channelNames.length; i++) {
        if (channelNames[i] == bestMatch) {
            return {
                channel: candidateChannels[i],
                index: i,
            };
        }
    }

}

/**
 * @description Moves all voice channels from the 'USED' category to the 'UNUSED' category.
 */

async function resetUsedChannels() {

    const usedChannels = Array.from(sd.usedCategory.children.values());
        usedChannels.forEach(usedChannel => {
            usedChannel.setParent(sd.unusedCategory, { lockPermissions: true })
            .catch(err => {
                console.log(err);
            });
        });
}

/**
 * @description Return a embed of with an image of the card
 * @param {String} rolename name of the role <faction>/<name> like in ./assets/ktulu/list.txt
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
    closestMatchChannel,
    resetUsedChannels,
    getGuideEmbed,
};