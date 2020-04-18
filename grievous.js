const Discord = require('discord.js');
const logger = require("winston");
const auth = require('./auth.json');
const text = require('./ressources.json')

//logger settings

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true,
});
//logger.level = 'debug';

//Initialize the Bot

const bot = new Discord.Client({
    token: auth.token,
    autorun: true,
});



//events

bot.on('ready', () => {
    bot.user.setActivity('&help', {type: "WATCHING"});
    })

bot.on('message', msg => {
    guild = msg.guild;
    guildId = guild.id;
    channelId = msg.channel.id;
    user = msg.member;

    message = msg.content;
    emojis = text.emojis;
    
    switch(message.toLowerCase()) {
        case 'hello there':
            sendGrievous(guildId, channelId, user);
            break;
        case 'ia':
            sendCthulhu(guildId, channelId, user);
            break;
        case 'pong' :
            msg.channel.send("**PING !**");
            break;
        case 'ping' :
            msg.channel.send(`**PONG !**`);
            break;
        case emojis[0]:
            sendEmoji(msg, emojis, 0, user.displayName);
            break;
        case emojis[1]:
            sendEmoji(msg, emojis, 1, user.displayName);
            break;
        case emojis[2]:
            sendEmoji(msg, emojis, 2, user.displayName);
            break;
        case emojis[3]:
            sendEmoji(msg, emojis, 3, user.displayName);
            break;
        case emojis[4]:
            sendEmoji(msg, emojis, 4, user.displayName);
            break;
        default:
            break;
    }

    if(message.substring(0,1) == '&') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        var channel = msg.member.voiceChannel;

        args = args.splice(1);
        
        switch(cmd) {
            case 'order66' :
                if(msg.member.hasPermission("ADMINISTRATOR")) {
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
                msg.channel.send( 
                    `Cliquez sur ce lien pour activer la vidéo sur ${channel.name}`
                    + text.texts.video
                    + `${guildId}/${audioChannel.id}`);
                msg.delete();
                break;
            case 'help' :
                sendHelp(guildId, channelId, user);
                msg.delete();
                break;
            case 'salut':
                user.send(text.texts.help);
                msg.delete();
                break;
            case 'clear':
                if(!user.hasPermission('ADMINISTRATOR')){
                    return;
                }
                else {
                    async function clear() {
                        const fetched = await msg.channel.fetchMessages({limite: 99});
                        msg.channel.bulkDelete(fetched);
                    }
                    clear();
                }
                msg.delete();
                break;
            default:
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
            + text.texts.welcome 
            + guild.channels.get(text.channels.affinatorium).toString());
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
            "Mon cher **<@" 
            + user.id 
            + ">**, tu as accès aux commandes suivantes :"
            + text.texts.help
            ).then(sent => {
                sent.delete(30000);
                //self-delete message after 30s
            });
    }
}

function sendEmoji(message, emojis, number, name)
{
    msg = message;
    let gif = bot.emojis.find(emoji => emoji.name === emojis[number]);
            msg.channel.send(`**${name}**  envoie : `);
            msg.channel.send(`${gif}`);
            msg.delete();
}

function Nope(guildId, channelId, user) {

    var guild = bot.guilds.get(guildId);
    if(guild && guild.channels.get(channelId)) {
        guild.channels.get(channelId).send(`Tu tentes quoi, exactement, ${user} ?\nSeuls les Grands Anciens peuvent faire ça.`).then();
    }
}

//login to Discord
bot.login(auth.token);
