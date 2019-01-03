const { spawn } = require('child_process');
const fs = require('fs');
let generate_embed = require('../Util/generate_simple_embed.js');

module.exports = async function random(message, color_types, args, convert){
    if(color_types.includes(args[0])){
            
        let int = Math.floor(Math.random() * 16777215);
        let color = convert[`int_2_${args[0]}`](int);
        let rgb = convert['int_2_rgb'](int);

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
            let joined_color_args = color;
            if(Array.isArray(color)) joined_color_args = color.join(' ');

            let color_embed = await generate_embed('Random Color:', `${args[0]}: **(${joined_color_args})**`, int);
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
        let error_embed = await generate_embed('Improper command use', 'Correct usage is c!random <input>\nCheck for **typos** as well');
        message.channel.send(error_embed).catch(err => console.log(err));
    }
}