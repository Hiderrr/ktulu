/* eslint-disable no-unused-vars */
const { closestMatch } = require('closest-match');
const { GuildChannel, Interaction } = require('discord.js');
const { client } = require('./bot.js');

/**
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

async function resetUsedChannels() {

    const usedChannels = Array.from(client.usedCategory.children.values());
        usedChannels.forEach(usedChannel => {
            usedChannel.setParent(client.unusedCategory, { lockPermissions: true })
            .catch(err => {
                console.log(err);
            });
        });

        console.log('Done!');

}


module.exports = {
    closestMatchChannel,
    resetUsedChannels,
};