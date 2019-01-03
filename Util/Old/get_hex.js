const fs = require('fs');

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./html.txt')
});

let line_num = 0;
let colors = {
    colors: [

    ]
}
let index = 0, counter = 0, palette = [];
lineReader.on('line', function(data){
    if(counter == 0){
        palette = [];
    }

    index = data.indexOf('#');

    if(index != -1){
        let hex = data.substr(index + 1, 12);
        palette.push(hex.replace(/\0/g, ''));
        counter++;
    }

    if(counter > 5) {
        colors.colors.push(palette);
        counter = 0;
    }
})

lineReader.on('close', function () {
    fs.writeFile('./palettes.json', JSON.stringify(colors, null, 4), (err) =>{

    })
});