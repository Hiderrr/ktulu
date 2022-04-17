/* eslint-disable no-unused-vars */
const { closestMatch } = require('closest-match');
const { Collection, GuildChannel, Snowflake } = require('discord.js');

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

module.exports = {
    closestMatchChannel,
};