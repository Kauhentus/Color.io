const { spawn } = require('child_process');
const fs = require('fs');
let generate_embed = require('../Util/generate_simple_embed.js');
const request = require('request').defaults({ encoding: null });
const getColors = require('get-image-colors');
const fileType = require('file-type')

module.exports = async function genpalette(message, args){
    let fetching_embed = await generate_embed('Fetching Image', 'Please wait...');
    message.channel.send(fetching_embed).catch(err => console.log(err));

    request.get(args[0], async function (err, res, body) {
        if(err){
            let error_embed = await generate_embed('Internal error', 'Try again later');
            message.channel.send(error_embed).catch(err => console.log(err));
            return;
        }
        let file_mime_raw = fileType(body), file_mime;
        if(file_mime_raw != null) {
            file_mime = file_mime_raw.mime;
        } else {
            let error_embed = await generate_embed('Invalid Image Link', 'Make sure your link is an image link');
            message.channel.send(error_embed).catch(err => console.log(err));
            return;
        }

        if(file_mime != false){
            getColors(body, file_mime).then(colors => {
                let palette = []
                colors.forEach(color => {
                    let values = color._rgb.slice(0, 3);
                    palette.push({
                        r: values[0],
                        g: values[1],
                        b: values[2],
                    });
                });

                let process = spawn(`python`, ['./Util/Python/palette_5.py', palette[0].r, palette[0].g, palette[0].b, palette[1].r, palette[1].g, palette[1].b, palette[2].r, palette[2].g, palette[2].b, palette[3].r, palette[3].g, palette[3].b, palette[4].r, palette[4].g, palette[4].b, message.author.id]); 
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
                    let color_embed = await generate_embed(`Colors from ${args[0]}:`, 'Hex: ' + colors.join(', ').toUpperCase().replace(/#/ig, ''));
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
            }).catch(async err => {
                let error_embed = await generate_embed('Internal Error', 'Make sure your link is an image link and try again later\nNote this feature is experimental and not all images work');
                message.channel.send(error_embed).catch(err => console.log(err));
            });
        } else {
            let error_embed = await generate_embed('Invalid Image Link', 'Make sure your link is an image link');
            message.channel.send(error_embed).catch(err => console.log(err));
        }
    });
}