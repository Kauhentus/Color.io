const Discord = require("discord.js");
const client = new Discord.Client();
const RC = require('reaction-core');
const handler = new RC.Handler()

const config = require("./Resources/config.json");
const generate_embed = require("./Util/generate_simple_embed.js");
const converter = require('./Util/main.js');
const convert = new converter();
const adobe_palettes = require('./Resources/palettes.json');

let c_help = require('./Commands/help.js');
let c_format_help = require('./Commands/format_help.js');
let c_convert = require('./Commands/convert.js');
let c_view = require('./Commands/view.js');
let c_palette = require('./Commands/palette.js');
let c_random = require('./Commands/random.js');
let c_genpalette = require('./Commands/genpalette.js')
let c_invite = require('./Commands/invite.js');


client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setActivity(` with Colors`);
});

const color_types = ['hex', 'rgb', 'int', 'hsl', 'hsv', 'cmyk', 'pantone'];
let user_cooldowns = new Map();

client.on("message", async message => {
    if(message.author.bot) return;
    if(message.content.indexOf(config.prefix) !== 0) return;
    
    const args = message.content.slice(config.prefix.length).replace(/\\n/g, '').trim().toLowerCase().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(user_cooldowns.has(message.author.id)){
        if(command == 'genpalette' || command == 'generatepalette'){
            if(new Date().getTime() - user_cooldowns.get(message.author.id) > 3000){
                user_cooldowns.set(message.author.id, new Date().getTime())
            } else {
                let error_embed = await generate_embed('You are on cooldown', 'Color-view web commands have a 3 second cooldown');
                message.channel.send(error_embed).catch(err => console.log(err));
                return;
            }
        } else if(command == 'random' || command == 'palette' || command == 'random'){
            if(new Date().getTime() - user_cooldowns.get(message.author.id) > 2000){
                user_cooldowns.set(message.author.id, new Date().getTime())
            } else {
                let error_embed = await generate_embed('You are on cooldown', 'Color-view commands have a 2 second cooldown');
                message.channel.send(error_embed).catch(err => console.log(err));
                return;
            }
        }
    } else {
        user_cooldowns.set(message.author.id, new Date().getTime());
    }

    if(command == 'help'){
        c_help(message);
    }

    else if(command == 'formathelp'){
        c_format_help(message);
    }

    else if(command == 'convert'){
        c_convert(message, args, convert, color_types);
    }

    else if(command == 'view'){
        c_view(message, args, color_types, convert);
    }

    else if(command == 'palette'){
        c_palette(message, adobe_palettes, convert, color_types, args);
    }

    else if(command == 'random'){
        c_random(message, color_types, args, convert);
    }

    else if(command == 'genpalette' || command == 'generatepalette'){
        c_genpalette(message, args);
    }

    else if(command == 'invite' || command == 'invites'){
        c_invite(message);
    }
});
client.on("error", error => {
    
})
client.login(config.token);
