const { WebSocketServer } = require("ws");
let { subscriber } = require("../shared/index");
const wss = new WebSocketServer({ port: 8080 });

let allSockets = [];

wss.on("connection", (socket) => {
  console.log("user connected");
  allSockets.push(socket);
});

(async function orderbookUpdate() {
  await subscriber.subscribe("book_Update", (message) => {
    //broadcasting
    let parsedMessage = JSON.parse(message);
    console.log(parsedMessage);
    broadcast(parsedMessage);
  });
})(); //IIFE - immediately invoking function

function broadcast(message) {
  allSockets.forEach((s) => {
    s.send(JSON.stringify(message));
  });
}
