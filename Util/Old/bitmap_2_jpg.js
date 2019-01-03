const Jimp = require('jimp');
const fs = require('fs');

fs.readdir('./Color\ Images/nature/', (err, files) => {
    files.map(file => {
        if(file.slice(-4) == '.bmp'){
            Jimp.read('./Color\ Images/nature/' + file, (err, img) => {
                img.write('./Color\ Images/nature/' + file.slice(0, -4) + '.jpg');
                fs.unlink('./Color\ Images/nature/' + file, (err) => {
                    
                });
            })
        }
    })
});