const Discord = require('discord.js');
const logger = require("winston");
const auth = require('./auth.json');

//logger settings

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true,
});
logger.level = 'debug';

//Initialize the Bot

const bot = new Discord.Client({
    token: auth.token,
    autorun: true,
});

bot.on('message', msg => {
    guildId = msg.guild.id;
    channelId = msg.channel.id;
    user = msg.member.displayName;

    message = msg.content;
    if(message.toLowerCase() == 'hello there') {
        sendGrievous(guildId, channelId, user);
    }
})

function sendGrievous(guildId, channelId, user) {

    var guild = bot.guilds.get(guildId);
    if(guild && guild.channels.get(channelId)) {
        guild.channels.get(channelId).send("Général " + user );
    }
}


//login to Discord
bot.login(auth.token);
