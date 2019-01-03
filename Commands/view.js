const { spawn } = require('child_process');
const fs = require('fs');
let generate_embed = require('../Util/generate_simple_embed.js');

module.exports = async function view(message, args, color_types, convert){
    if(color_types.includes(args[0])){
            
        let trailing_args = args.slice(1);
        if(trailing_args.length == 1) trailing_args = trailing_args[0];
        let rgb, display_color;
        try {
            rgb = convert[`${args[0]}_2_rgb`](trailing_args);
            display_color = convert[`rgb_2_int`](rgb);
        } catch (e) {
            let error_embed = await generate_embed('Invalid Format', 'Consult \`c!formathelp\` for more info');
            message.channel.send(error_embed);
            return;
        }

        if(rgb == null || display_color == null){
            let error_embed = await generate_embed('Invalid Format', 'Consult \`c!formathelp\` for more info');
            message.channel.send(error_embed);
            return;
        }

        let process = spawn(`python`, ['./Util/Python/color.py', rgb[0], rgb[1], rgb[2], message.author.id]); 
        let error = false;
    
        process.stderr.on('data', function(data) {
            message.channel.send(`\`\`\`Error:\n${data.toString()}\`\`\``);
            error = true;
            fs.unlink(`./temp/${message.author.id}.png`, (err) => {
                if(err) console.log(err);
            });
            return;
        });

        process.stdout.on('end', async function() {
            if(error) return;
            let joined_trailing_args = trailing_args;
            if(Array.isArray(trailing_args)) joined_trailing_args = trailing_args.join(' ');

            let color_embed = await generate_embed('Color:', `${args[0]}: **(${joined_trailing_args})**`, display_color);
            message.channel.send({
                file: `./temp/${message.author.id}.png`
            }).then(() => {
                message.channel.send(color_embed).then(() => {
                    fs.unlink(`./temp/${message.author.id}.png`, (err) => {
                        if(err) console.log(err);
                    });
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
        });
    } else {
        let error_embed = await generate_embed('Improper command use', 'Correct usage is c!view <input> <color>\nCheck for **typos** as well');
        message.channel.send(error_embed).catch(err => console.log(err));
    }
}