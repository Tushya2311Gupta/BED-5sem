//create server using express
const express = require('express')
const app = express()
const fs=require('fs')
app.use(express.json())
app.get('/', (req, res) => {
    let name = req.query.name || 'Tushya';
    res.send(`Hello ${name}`)
})
app.post('/abc', (req, res) => {
    let alluser=[];
    let name = {name, password} = req.body;
    fs.readFile('./users.txt', 'utf8', function(err, data) {
        if (err) {
            console.error('Error reading user file:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (data && data.length > 0) {
            alluser=JSON.parse(data)
        }
        alluser.push(user);
        fs.writeFile("./users.txt",JSON.stringify(alluser),function(err){
            if(err) return res.send(err);
            
        })
    });
    fs.appendFile('./users.txt', JSON.stringify(alluser) + '\n', (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(201).json({ message: 'Data saved successfully', data: { name, password } });
    });
})
app.post('/log', (req, res) => {
    let user = req.body.name;
});
app.post('/users', (req, res) => {
    fs.writeFile('./users.txt', JSON.stringify(req.body), (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
});
//user registration api in which the user will send username and password in the body of the request and the system will first read the message from the body and then the data will be saved in the user.txt file and make sure the data doesn't overwrite
app.post('/register', (req, res) => {
    const { name, password } = req.body;
    fs.readFile('./users.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading user file:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        const users = data ? data.split('\n').filter(Boolean).map(line => JSON.parse(line)) : [];
        const userExists = users.some(user => user.name === name);
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
            pass
        }
    });
    fs.appendFile('./users.txt', JSON.stringify({ name, password }) + '\n', (err) => {
        if (err) {
            console.error('Error writing to user file:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(201).json({ message: 'User registered successfully', user: { name } });
    });
});
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
app.post('/about', (req, res) => {
    console.log(req.body);
    res.send("Hello from Tushya");
})
module.exports = app