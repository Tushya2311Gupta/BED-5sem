const fs = require('fs');

fs.readFile('../demo2.txt', function(err, data) {
    if (err) {
        return console.log(err);
    }
    console.log("File read successfully!");
    console.log(data.toString());
})