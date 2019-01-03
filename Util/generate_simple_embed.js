module.exports = async function generate_simple_embed(name, value, color = Math.floor(Math.random() * 16777215)){
    return new Promise((resolve, reject) => {
        resolve({
                    embed: {
                    "url": "https://discordapp.com",
                    "color": color,
                    "timestamp": "2018-12-23T05:19:10.633Z",
                    "footer": {
                        "text": "Color.io | @The3DSquare"
                    },
                    "fields": [
                        {
                            "name": name,
                            "value": value
                        }
                    ]
                }
            }
        );
    });
}