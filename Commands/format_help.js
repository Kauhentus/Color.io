module.exports = async function format_help(message){
    let fields = [
        {
            'name': 'rgb',
            'value': 
                '  - <Red> <Green> <Blue>\n' +
                '  - All are in range from 0 to 255 (integers)\n' +
                '  > c!view rgb 100 150 200'
        },
        {
            'name': 'hex',
            'value': 
                '  - <Hex Number>\n' +
                '  - Must be only 6 digits long \n' +
                '  > c!view hex 12ab89'
        },
        {
            'name': 'int',
            'value': 
                '  - <Integer>\n' +
                '  - Must be equal or less than 16777215 \n' +
                '  > c!view int 20480'
        },
        {
            'name': 'cmyk',
            'value': 
                '  - <Cyan> <Magenta> <Yellow> <Key(Black)>\n' +
                '  - All are in range from 0 to 1 (decimals)\n' +
                '  > c!view cmyk 0.2 0.4 0.6 0.8'
        },
        {
            'name': 'hsl',
            'value': 
                '  - <Hue> <Saturation> <Level>\n' +
                '  - <Hue> range from 0 to 360, <Saturation> and <Level> range from 0 to 100\n' +
                '  > c!view hsl 100 100 100'
        },
        {
            'name': 'hsv',
            'value': 
                '  - <Hue> <Saturation> <Value>\n' +
                '  - <Hue> range from 0 to 360, <Saturation> and <Value> range from 0 to 100\n' +
                '  > c!view hsv 100 100 100'
        },
    ]
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
    
    message.channel.send(embed).catch(err => console.log(err));
}