class OrderBook {
    multipleMarket=new Map(); 
    _constructor(symbol) {  //new OrderBook=new OrderBook("BTCUSD") {bracket ke andr vali cheez symbol h}
        this.symbol = symbol,
        this.bids = [],
        this.ask = [],
        this._nextId = 1,      //if a function or variable start with _ (private) iska koi kaam nhi h bs ik naming comvention h ki yeh private h
        this.lastTradedPrice = null
    }
    static getOrderbook(symbol){
        if(!multipleMarket.has(symbol)){
            let orderbook=new OrderBook(symbol);
            multipleMarket.set(symbol,orderbook);
        }
        return multipleMarket.get(symbol);
    }

    _genOrderId() {
        return this._nextId++;
    }

    _sort(sides) {
        if (sides === "BUY") {
            this.bids.sort((a, b) => {
                if (a.price != b.price) {
                    return b.price - a.price;
                }
                return a.timestamp - b.timestamp;
            });    //sort use krte time comparator dena hota h sort function mein (desc mein krne kelie b-a hota h asc mein a-b)
        } else {
            this.ask.sort((a, b) => {
                if (a.price != b.price) {
                    return a.price - b.price;
                }
                return a.timestamp - b.timestamp;
            });
        }
    }

    //function to place a new order in orderbook
    /*
        1. create new order{orderId,side,type,price?,originalQuantity,remainingQuantity,remainingQuantity,timestamp,user}
        2. match type if type==market, call marketMatch, else call limit_match
   */
    placeOrder(side, type, price = null, quantity, user) {
        /*Basic Validation*/
        let order = {
            orderId: this._genOrder(),
            symbol: this.symbol,
            side,
            type,
            price,
            originalQty: quantity,
            remainingQty: quantity,
            exectQty: 0,
            timestamp: Date.now(),
            user: user
        }

        if (type === "MARKET") {
            let result = this._marketMatch(order);
            if (result.remainingQty > 0) {
                console.log("Order completed: " + result.exectQty + " " + "cancel order: " + result.remainingQty);
            }

            return {book:this.getBookSnapshot,result};
        } else {
            let result = this._limitMatch(order);
            return {book:this.getBookSnapshot(),result};
        }
    }

    //execute order if it is a market order
    /*
        bids:[] sorted descending
        ask:[] sorted ascending
        1. type: buy || sell
        2. if buy start buying from asks array starting from index 0,
           Loop while order.remainingQty> && ask.length>0.
           Buy min(order.remainingQty,asks[0].remainingQty),
           Update remainingQty and executedQty from both sides
    */
    _marketMatch(order) {
        if (order.side === "BUY") {
            let askArr = this.ask;
            while (order.remainingQty > 0 && askArr.length > 0) {
                let top = askArr[0];
                let orderFill = Math.min(order.remainingQty, top.remainingQty);

                order.exectQty = order.exectQty + orderFill;
                order.remainingQty = order.remainingQty - orderFill;

                top.exectQty = top.exectQty + orderFill;
                top.remainingQty = top.remainingQty - orderFill;

                this.lastTradedPrice = top.price;

                if (top.remainingQty <= 0) {
                    askArr.shift();
                }
            }
            return order;
        } else if (order.side === "SELL") {
            let bidArr = this.bids;
            while (order.remainingQty > 0 && bidArr.length > 0) {
                let top = bidArr[0];
                let orderFill = Math.min(order.remainingQty, top.remainingQty);

                order.exectQty = order.exectQty + orderFill;
                order.remainingQty = order.remainingQty - orderFill;

                top.exectQty = top.exectQty + orderFill;
                top.remainingQty = top.remainingQty - orderFill;

                this.lastTradedPrice = top.price;

                if (top.remainingQty <= 0) {
                    bidArr.shift();
                }
            }
            return order;
        }
    }

    _limitMatch(order) {
        if (order.side === "BUY") {
            let opposite = this.ask;
            while (order.remainingQty > 0 && opposite.length > 0) {
                let top = opposite[0];
                if (order.price >= top.price) {
                    let filledOrder = Math.min(order.remainingQty, top.remainingQty);

                    order.remainingQty -= filledOrder;
                    order.exectQty += filledOrder;

                    top.remainingQty -= filledOrder;
                    top.exectQty += filledOrder;

                    this.lastTradedPrice = top.price;

                    if (top.remainingQty <= 0) {
                        opposite.shift();
                    }
                } else {
                    break;
                }
            }
            if (order.remainingQty > 0) {
                this.bids.push(order);
                this._sort("BUY");
            }
        }
        else if (order.side === "SELL") {
            let opposite = this.bids;
            while (order.remainingQty > 0 && opposite.length > 0) {
                let top = opposite[0];
                if (order.price <= top.price) {
                    let filledOrder = Math.min(order.remainingQty, top.remainingQty);

                    order.remainingQty -= filledOrder;
                    order.exectQty += filledOrder;

                    top.remainingQty -= filledOrder;
                    top.exectQty += filledOrder;

                    this.lastTradedPrice = top.price;

                    if (top.remainingQty <= 0) {
                        opposite.shift();
                    }
                } else {
                    break;
                }
            }
            if (order.remainingQty > 0) {
                this.ask.push(order);
                this._sort("SELL");
            }
        }
    }

    getBookSnapshot() {
        return {
            lastUpdated: Date.now(),
            bids: this.bids.map((o) => [o.price, o.remainingQty]),
            asks: this.ask.map((o) => [o.price, o.remainingQty])
        }
    }
}

let BTCUSDOrderBook=new OrderBook()

// BTCUSDOrderBook.bids.push({orderId:2,side:"BUY",type:"MARKET",price:100,quantity:10,timestamp:Date.now(),user:"Saloni"});
// BTCUSDOrderBook.bids.push({orderId:2,side:"BUY",type:"MARKET",price:95,quantity:10,timestamp:Date.now(),user:"Sanam"});
// BTCUSDOrderBook.bids.push({orderId:2,side:"BUY",type:"MARKET",price:101,quantity:10,timestamp:Date.now(),user:"Vanshika"});
// BTCUSDOrderBook.bids.push({orderId:2,side:"BUY",type:"MARKET",price:90,quantity:10,timestamp:Date.now(),user:"Keshav"});
// BTCUSDOrderBook.bids.push({orderId:2,side:"BUY",type:"MARKET",price:92,quantity:10,timestamp:Date.now(),user:"Sneha"});

// BTCUSDOrderBook._sort("BUY");
// console.log(BTCUSDOrderBook.bids);

// BTCUSDOrderBook.ask.push({orderId:2,side:"SELL",type:"MARKET",price:80,quantity:10,timestamp:Date.now(),user:"Saloni"});
// BTCUSDOrderBook.ask.push({orderId:2,side:"SELL",type:"MARKET",price:55,quantity:10,timestamp:Date.now(),user:"Sanam"});
// BTCUSDOrderBook.ask.push({orderId:2,side:"SELL",type:"MARKET",price:71,quantity:10,timestamp:Date.now(),user:"Vanshika"});
// BTCUSDOrderBook.ask.push({orderId:2,side:"SELL",type:"MARKET",price:56,quantity:10,timestamp:Date.now(),user:"Keshav"});
// BTCUSDOrderBook.ask.push({orderId:2,side:"SELL",type:"MARKET",price:66,quantity:10,timestamp:Date.now(),user:"Sneha"});

// BTCUSDOrderBook._sort("SELL");
// console.log(BTCUSDOrderBook.ask);


console.log(BTCUSDOrderBook.getBookSnapshot());
//fill bids as market maker
BTCUSDOrderBook.placeOrder("BUY","LIMIT","1506.00",10,"Vanshika");
BTCUSDOrderBook.placeOrder("BUY","LIMIT","1505.00",20,"Sanam");
BTCUSDOrderBook.placeOrder("BUY","LIMIT","1500",10,"Saloni");

console.log(BTCUSDOrderBook.getBookSnapshot());

//fill ask as market maker
BTCUSDOrderBook.placeOrder("SELL","LIMIT","1507.00",10,"Saloni");
BTCUSDOrderBook.placeOrder("SELL","LIMIT","1508.00",10,"Saloni");
BTCUSDOrderBook.placeOrder("SELL","LIMIT","1509.00",10,"Saloni");

console.log(BTCUSDOrderBook.getBookSnapshot());

console.log("Placing SELL LIMIT order @1505 (should match existing BUY orders)");
BTCUSDOrderBook.placeOrder("SELL", "LIMIT", 1505.00, 5, "Sanam");
console.log(BTCUSDOrderBook.getBookSnapshot());
console.log("Placing BUY LIMIT order @1508 (should match existing SELL orders)");
BTCUSDOrderBook.placeOrder("BUY", "LIMIT", 1508.00, 8, "Vanshika");
console.log(BTCUSDOrderBook.getBookSnapshot());

console.log("Placing BUY MARKET order (should take from best ASK)");
BTCUSDOrderBook.placeOrder("BUY", "MARKET", null, 15, "Aman");
console.log(BTCUSDOrderBook.getBookSnapshot());

console.log("Placing SELL MARKET order (should take from best BID)");
BTCUSDOrderBook.placeOrder("SELL", "MARKET", null, 12, "Isha");
console.log(BTCUSDOrderBook.getBookSnapshot());

console.log("Final Order Book Snapshot:");
console.log(BTCUSDOrderBook.getBookSnapshot());

module.exports = OrderBook