module.exports = async function help(message){
    let fields = [
        {
            'name': 'c!palette <format>',
            'value': 
                '  * Generates pseudo-random palette\n' +
                '  - <format> color format of palette\n' +
                '  > c!palette hex'
        },
        {
            'name': 'c!genpalette <link>',
            'value': 
                '  * Generates palette from image\n' +
                '  - <link> Valid image link\n' +
                '  > c!genpalette https://annsflowersyoakum.com/wp-content/uploads/interior1.jpg'
        },
        {
            'name': 'c!convert <input> <desired output> <color>',
            'value': 
                '  * Converts color formats to each other\n' +
                '  - <input> is the color format of the input color (i.e. hex, rgb)\n' +
                '  - <desired output> is the color format you wish to convert <input> into\n' +
                '  - <color> is the your color in <input> format\n' +
                '  > c!convert rgb hex 100 150 200'
        },
        {
            'name': 'c!view <format> <color>',
            'value': 
                '  * Displays square of inputted color\n' +
                '  - <format> is the color format of the input color (i.e. hex, rgb)\n' +
                '  - <color> is the your color in <input> format\n' +
                '  > c!view rgb 111 122 223'
        },
        {
            'name': 'c!random <format>',
            'value': 
                '  * Displays random color of input format\n' +
                '  - <format> is the desired color format\n' +
                '  > c!random hex'
        },
        {
            'name': 'c!formathelp',
            'value': '  - View specific formatting for each color format'
        },
        {
            'name': 'Supported color types:',
            'value': '  - hex, rgb, int, hsl, hsv, cmyk'
        }
    ];
    let embed = {
        embed: {
            "url": "https://discordapp.com",
            "color": Math.floor(Math.random() * 16777215),
            "timestamp": "2018-12-23T05:19:10.633Z",
            "footer": {
                "text": "Color.io | @The3DSquare"
            },
            "author": {
                "name": 'Commands',
                "icon_url": message.author.avatarURL
            },
            "fields": fields
        }
    }  
    
    message.channel.send(embed).then(message => {
        /*const collector = msg.createReactionCollector((reaction, user) => user !== client.user);
        collector.on('collect', async (messageReaction) => {
            if (messageReaction.emoji.name === reactions.x) {
                msg.delete(); // Delete the message
                collector.stop(); // Delete the collector.
                return;
            }

            // Get the index of the page by button pressed
            const pageIndex = buttons.indexOf(messageReaction.emoji.name);
            if (pageIndex === -1 || !pages[pageIndex]) return;
            msg.edit(pages[pageIndex]);

            const notbot = messageReaction.users.filter(clientuser => clientuser !== client.user).first();
            await messageReaction.remove(notbot);
        });*/
    });
}

