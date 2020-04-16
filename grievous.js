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



//events

bot.on('message', msg => {
    guildId = msg.guild.id;
    channelId = msg.channel.id;
    user = msg.member;

    message = msg.content;
    emojis = ["cthulhukiss", 'hearteye', 'cuteyogsothoth', 'cuteazatoth', 'cuteshoggoth'];
    
    switch(message.toLowerCase()) {
        case 'hello there':
            sendGrievous(guildId, channelId, user);
            break;
        case 'ia':
            sendCthulhu(guildId, channelId, user);
            break;
        case emojis[0]:
            let kiss = bot.emojis.find(emoji => emoji.name === emojis[0]);
            msg.channel.send("**" + user.displayName + "**" +" envoie : ");
            msg.channel.send(`${kiss}`);
            msg.delete();
            break;
        case emojis[1]:
            const heart = bot.emojis.find(emoji => emoji.name === emojis[1]);
            msg.channel.send("**" + user.displayName + "**" +" envoie : ");
            msg.channel.send(`${heart}`);
            msg.delete();
            break;
        case emojis[2]:
            const yog = bot.emojis.find(emoji => emoji.name === emojis[2]);
            msg.channel.send("**" + user.displayName + "**" +" envoie : ");
            msg.channel.send(`${yog}`);
            msg.delete();
            break;
        case emojis[3]:
            const aza = bot.emojis.find(emoji => emoji.name === emojis[3]);
            msg.channel.send("**" + user.displayName + "**" +" envoie : ");
            msg.channel.send(`${aza}`);
            msg.delete();
            break;
        case emojis[4]:
            const sho = bot.emojis.find(emoji => emoji.name === emojis[4]);
            msg.channel.send("**" + user.displayName + "**" +" envoie : ");
            msg.channel.send(`${sho}`);
            msg.delete();
            break;
    }

    if(message.substring(0,1) == '&') {
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
                msg.delete();
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
                msg.delete();
                break;
            case 'ping' :
                Ping(guildId, channelId, user);
                msg.delete();
                break;
            case 'help' :
                sendHelp(guildId, channelId, user);
                msg.delete();
                break;
        }
    }
})

bot.on('guildMemberAdd', (member) => {
    var guild = member.guild;
    var memberTag = member.user.tag;

    if(guild.systemChannel) {
        guild.systemChannel.send(member.id
            + "(" + memberTag + ")"
            + " s'est joint au Temple d'Affinois, tape `&help` pour savoir ce que je fais !\nPense à regarder les messages épinglés dans l'" 
            + message.guild.channels.get('682808121890308151').toString());
    }
});

//functions

function sendCthulhu(guildId, channelId, user) {

    var guild = bot.guilds.get(guildId);
    if(guild && guild.channels.get(channelId)) {
        guild.channels.get(channelId).send("**Iä ! Iä ! " + user + " f'hromtagn !**");
    }
}

function sendGrievous(guildId, channelId, user) {

    var guild = bot.guilds.get(guildId);
    if(guild && guild.channels.get(channelId)) {
        guild.channels.get(channelId).send("Général " + user );
    }
}

function delCmd(message) {

}

function sendHelp(guildId, channelId, user) {

    var guild = bot.guilds.get(guildId);
    if(guild && guild.channels.get(channelId)) {
        guild.channels.get(channelId).send(
            "Mon cher **<@" + user.id + ">** tu as accès aux commandes suivantes :\n► &ping\n► &order66\n► &unmute\n\nEt voici les invocations auxquelles je répond :\n► `hello there`\n► `Ia`\n► `HeartEye`\n► `CthulhuKiss`\n► `CuteYogSothoth`\n► `CuteAzatoth`\n► `CuteShoggoth`"
            );
    }
}

function Nope(guildId, channelId, user) {

    var guild = bot.guilds.get(guildId);
    if(guild && guild.channels.get(channelId)) {
        guild.channels.get(channelId).send("Tu tentes quoi, exactement, " + user + " ?");
    }
}

function Ping(guildId, channelId, user) {

    var guild = bot.guilds.get(guildId);
    if(guild && guild.channels.get(channelId)) {
        guild.channels.get(channelId).send("**PONG !**");
    }
}

//login to Discord
bot.login(auth.token);
