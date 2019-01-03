let generate_embed = require('../Util/generate_simple_embed.js');

module.exports = async function convert(message, args, convert, color_types){
    if(color_types.includes(args[0]) && color_types.includes(args[1])){
        let input = args.slice(2);
        if(input.length == 1) input = input[0];
        let result;
        try {
            result = convert[`${args[0]}_2_${args[1]}`](input);
        } catch(e){
            let error_embed = await generate_embed('Invalid Format', 'Consult \`c!formathelp\` for more info');
            message.channel.send(error_embed);
            return;
        }
        
        if(Array.isArray(result)) result = result.join(' ').replace(/\\n/g, '');

        if(result == null) {
            let error_embed = await generate_embed('Invalid Format', 'Consult \`c!formathelp\` for more info');
            message.channel.send(error_embed);
            return;
        } else {
            result = result.toLowerCase();

            let display_color = convert[`${args[0]}_2_int`](input);
            if(display_color > 16777215){
                let error_embed = await generate_embed('Invalid Format', 'Consult \`c!formathelp\` for more info');
                message.channel.send(error_embed);
                return;
            } else {
                let embed = await generate_embed(`Converted ${args[0].toLowerCase()} to ${args[1].toLowerCase()}`, `(${args.slice(2).join(', ')}) converted to **(${result})**`, display_color);
                message.channel.send(embed);
            }
        }
    } else {
        let error_embed = await generate_embed('Improper command use', 'Correct usage is c!convert <input> <desired output> <color>\nCheck for **typos** as well');
        message.channel.send(error_embed).catch(err => console.log(err));
    }
}