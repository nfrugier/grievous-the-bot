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

    if(message.substring(0,1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);

        switch(cmd) {
            case 'order66' :
                if(msg.member.hasPermission("ADMINISTRATOR")) {
                    var channel = msg.member.voiceChannel;
                    for (var member of channel.members) {
                        member[1].setMute(true);
                    }
                }
                else {
                    Nope(guildId, channelId, user);
                }
                break;
            case 'unmute' :
                if(msg.member.hasPermission("ADMINISTRATOR")) {
                    var channel = msg.member.voiceChannel;
                    for (var member of channel.members) {
                        member[1].setMute(false);
                    }
                }
                else {
                    Nope(guildId, channelId, user);
                }
                break;
            case 'ping' :
                Ping(guildId, channelId, user);
                break;
            case 'help' :
                sendHelp(guildId, channelId, user);
                break;
        }
    }
})

function sendGrievous(guildId, channelId, user) {

    var guild = bot.guilds.get(guildId);
    if(guild && guild.channels.get(channelId)) {
        guild.channels.get(channelId).send("Général " + user );
    }
}

function sendHelp(guildId, channelId, user) {

    var guild = bot.guilds.get(guildId);
    if(guild && guild.channels.get(channelId)) {
        guild.channels.get(channelId).send("Mon cher " + user );
    }
}

function Nope(guildId, channelId, user) {

    var guild = bot.guilds.get(guildId);
    if(guild && guild.channels.get(channelId)) {
        guild.channels.get(channelId).send("Tu tentes quoi, exactement " + user + " ?");
    }
}

function Ping(guildId, channelId, user) {

    var guild = bot.guilds.get(guildId);
    if(guild && guild.channels.get(channelId)) {
        guild.channels.get(channelId).send("PONG !");
    }
}

//login to Discord
bot.login(auth.token);
