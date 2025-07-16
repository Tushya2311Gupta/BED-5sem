const fs = require('fs');

fs.readFile('../demo2.txt', function(err, data1) {
    if (err) {
        return console.log(err);
    }
    fs.readFile('../demo.txt', function(err, data2) {
        if (err) {
            return console.log(err);
        }
        fs.writeFile('../demo3.txt', data2.toString(), function(err) {
            if (err) {
                return console.log(err);
            }
        });
        console.log("File read successfully!");
        console.log(data2.toString());
    })
    console.log("File written successfully!");
})