const getColors = require('get-image-colors')
let fs = require('fs');

let p = {
    palettes: []
};

let index = 0;
fs.readdir('./Color\ Images/all_flower_images/', (err, data) => {
    data.map(file => {
        getColors('./Color\ Images/all_flower_images/' + file).then(colors => {
            //console.log(file);
            let palette = []
            colors.forEach(color => {
                let values = color._rgb.slice(0, 3);
                palette.push({
                    r: values[0],
                    g: values[1],
                    b: values[2],
                });
            });
            p.palettes.push(palette);

            console.log(index);
            index++;
            fs.writeFile('./color_palettes_all.json', JSON.stringify(p, null, 4), (err) => {
                
            });
        }).catch(err => console.log(err))
    })
});

