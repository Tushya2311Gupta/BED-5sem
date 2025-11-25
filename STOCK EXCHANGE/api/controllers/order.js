const OrderBook = require("../service/orderService");
let { publisher } = require("../../shared/index");

let ob = new OrderBook("BTCUSD"); //global object

module.exports.postPlaceOrder = async (req, res) => {
  //to create a new order for user who is placing an order
  let {symbol}=req.query();
  let {side, type, price, quantity, user} = req.body;
  let ob=OrderBook
  // if i create an object here
  let response = ob.placeOrder(side, type, price, quantity, user);
  publisher.publish("book_Update", JSON.stringify(response.book));

  res.json({
    event: "orderupdate",
    data: {
      orderReport: response.result,
      book: response.book,
    },
  });
};

module.exports.getOrderBook = async(req, res) => {
  let {symbol}=req.query();
  let ob=OrderBook.getOrderbook(symbol);
  let bookSnapshot = ob.getBookSnapshot();
  return res.json(bookSnapshot);
}
module.exports.getRecentTrades = async(req, res) => {
  let {symbol,limit}=req.query();
  let recentTrades=ob.getRecentTrades(limit);
  return res.json(recentTrades);
}

