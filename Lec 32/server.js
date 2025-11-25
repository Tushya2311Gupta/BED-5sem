const {WebSocketServer} = require('ws');
const wss=new WebSocketServer({port:8080});

wss.on('connection',function connection(ws){
    console.log('New client connected');
    ws.on("message",function (message){
        console.log('Received:',message.toString());
        if (message.toString()==='ping'){
            ws.send('pong');
        }
    });
});


let allSocket=[];
wss.on('connection',function connection(ws){
    console.lof
    allSocket.push(ws); 
    ws.on('close',function(){
        allSocket=allSocket.filter(s=>s!==ws);
    });
});

setInterval(function(){
    const message=JSON.stringify({time:new Date().toISOString()});
    allSocket.forEach(ws=>ws.send(message));
},1000);

console.log('WebSocket server is running on ws://localhost:8080');