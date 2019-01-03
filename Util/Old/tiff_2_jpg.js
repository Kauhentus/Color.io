const Jimp = require('jimp');
const fs = require('fs');

fs.readdir('./Color\ Images/urban/', (err, files) => {
    files.map(file => {
        if(file.slice(-4) == '.TIF'){
            Jimp.read('./Color\ Images/urban/' + file, (err, img) => {
                if (err) console.log(err)
                img.write('./Color\ Images/urban/' + file.slice(0, -4) + '.jpg');
                fs.unlink('./Color\ Images/urban/' + file, (err) => {
                    console.log(file);
                });
            })
        }
    })
});