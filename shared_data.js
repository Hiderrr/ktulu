const { Collection } = require('discord.js');

// Initial declarations are here purely for estetical reasons
// and to declutter the code a bit.
const sd = {
    mainKtuluTextName : 'general',
    mainKtuluVcName : 'ktulu',
    usedChannels : new Array(),
    ktuluVcMembers : new Array(),
    commands : new Collection(),
    logNonErrors : true,
};

module.exports = sd;