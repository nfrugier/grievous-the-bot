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
    guild = msg.guild;
    guildId = guild.id;
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
                    user.setMute(false);
                    msg.channel.send(`${user} a décidé de couper la parole à tout le monde sur ${channel.name}`);
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
                    msg.channel.send(`${user} a décidé de redonner la parole à tout le monde sur ${channel.name}`);
                }
                else {
                    Nope(guildId, channelId, user);
                }
                msg.delete();
                break;
            case 'video' :
                var audioChannel = msg.member.voiceChannel;
                msg.channel.send(`Cliquez sur ce lien pour activer la vidéo :\n► http://www.discordapp.com/channels/${guildId}/${audioChannel.id}`);
                msg.delete();
                break;
            case 'ping' :
                msg.channel.send(`**PONG !**`);
                break;
            case 'pong' :
                msg.channel.send("**PING !**");
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
            + " s'est joint au Temple d'Affinois, tape `&help` pour savoir ce que je fais !"
            +"\nPense à regarder les messages épinglés dans l'" 
            + guild.channels.get('682808121890308151').toString());
    }
});

//functions

function sendCthulhu(guildId, channelId, user) {

    var guild = bot.guilds.get(guildId);
    if(guild && guild.channels.get(channelId)) {
        guild.channels.get(channelId).send(`**Iä ! Iä ! ${user} f'hromtagn !**`);
    }
}

function sendGrievous(guildId, channelId, user) {

    var guild = bot.guilds.get(guildId);
    if(guild && guild.channels.get(channelId)) {
        guild.channels.get(channelId).send("Général " + user );
    }
}

function sendHelp(guildId, channelId, user) {

    var guild = bot.guilds.get(guildId);
    if(guild && guild.channels.get(channelId)) {
        guild.channels.get(channelId).send(
            "Mon cher **<@" + user.id + ">**, tu as accès aux commandes suivantes :"
            +"\n► &ping : `Pong`"
            +"\n► &video : permet générer un lien pour activer la vidéo sur un chan Audio"
            +"\n► &order66 (Grands Anciens seulement)"
            +"\n► &unmute (Grands Anciens seulement)"
            +"\n\nEt voici les invocations auxquelles je répond :"
            +"\n► `hello there`"
            +"\n► `Ia`"
            +"\n\nJe sais aussi faire des gif animés alors même que ce n'est pas un serveur Nitro (les Grands Anciens sont des gros radins)"
            +"\nTape simplement un de ces mots impies :"
            +"\n► `HeartEye`"
            +"\n► `CthulhuKiss`"
            +"\n► `CuteYogSothoth`"
            +"\n► `CuteAzatoth`"
            +"\n► `CuteShoggoth`"
            );
    }
}

function Nope(guildId, channelId, user) {

    var guild = bot.guilds.get(guildId);
    if(guild && guild.channels.get(channelId)) {
        guild.channels.get(channelId).send(`Tu tentes quoi, exactement, ${user} ?\nSeuls les Grands Anciens peuvent faire ça.`);
    }
}

//login to Discord
bot.login(auth.token);
