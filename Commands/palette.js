const { spawn } = require('child_process');
const fs = require('fs');
let generate_embed = require('../Util/generate_simple_embed.js');

module.exports = async function palette(message, adobe_palettes, convert, color_types, args){
    let hex_palette = adobe_palettes.colors[Math.round(Math.random() * adobe_palettes.colors.length)], valid = false;
        if(color_types.includes(args[0])) valid = true;

        if(valid){
            let colors = [], palette = [];
            hex_palette.map(color => {
                let format = convert[`hex_2_${args[0]}`](color);
                if(Array.isArray(format)){
                    format = `(${format.join(' ')})`;
                } else {
                    format = `${format}`;
                }
                let rgb_vals = convert.hex_2_rgb(color);
                palette.push({
                    r: rgb_vals[0],
                    g: rgb_vals[1],
                    b: rgb_vals[2]
                });
                if(Array.isArray(format)) format = `(${format.join(' ')})`;
                colors.push(format);
            });
            
            let process = spawn(`python`, ['./Util/Python/palette.py', palette[0].r, palette[0].g, palette[0].b, palette[1].r, palette[1].g, palette[1].b, palette[2].r, palette[2].g, palette[2].b, palette[3].r, palette[3].g, palette[3].b, palette[4].r, palette[4].g, palette[4].b, palette[5].r, palette[5].g, palette[5].b, message.author.id]); 
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
                let color_embed = await generate_embed(`Colors (${args[0]}):`, colors.join(', '));
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
            let error_embed = await generate_embed('Invalid Format', 'Check c!help for list of color formats\nCheck for **typos** as well');
            message.channel.send(error_embed).catch(err => console.log(err));
        }
}