module.exports = async function invite(message){
    let fields = [
        {
            'name': 'Invite **Color.io** to your server:',
            'value': 'https://discordapp.com/oauth2/authorize?client_id=527519839338889236&permissions=2048&scope=bot'
        },
        {
            'name': 'Join our support server:',
            'value': 'https://discordapp.com/invite/n8QEXQC'
        }
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
                "name": 'Invites',
                "icon_url": message.author.avatarURL
            },
            "fields": fields
        }
    }  
    
    message.channel.send(embed).catch(err => console.log(err));
}