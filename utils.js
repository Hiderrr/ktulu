/* eslint-disable no-unused-vars */
const { closestMatch } = require('closest-match');
const { GuildChannel, Interaction } = require('discord.js');

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

/**
 * @param {Interaction} interaction
 * an interaction object passed by an event
 */

async function resetUsedChannels(interaction) {

    const usedChannels = Array.from(interaction.client.usedCategory.children.values());
        usedChannels.forEach(usedChannel => {
            usedChannel.setParent(interaction.client.unusedCategory, { lockPermissions: true })
            .catch(err => {
                console.log(err);
                return interaction.reply('An error occured!');
            });
        });

        return interaction.reply('Done!');

}


module.exports = {
    closestMatchChannel,
    resetUsedChannels,
};