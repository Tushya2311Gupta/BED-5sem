class OrderBook{
    constructor(symbol="BTCUSD"){
        this.symbol=symbol,
        this.bids=[],
        this.ask=[],
        this._nextId=1,
        this.lastTradedPrice=null
    }

    _genOrderId(){
        return this._nextId++;
    }
    _sort(sides){
        if(sides==="BUY"){
            this.bids.sort((a,b)=>{
                if(a.price!=b.price){
                    return b.price-a.price;
                }
                else{
                    return a.timeStamp-b.timeStamp;
                }
            })
        }
        else{
            this.ask.sort((a,b)=>{
                if(a.price!=b.price){
                    return a.price-b.price
                }
                return a.timeStamp-b.timeStamp;
            })
        }
    }
    placeOrder(symbol,side,type,price=null,quantity,user){
        let order={
            orderId:this._genOrderId,
            symbol:this.symbol,
            side:side,
            type:type,
            price:price,
            orignQty:quantity,
            remainQty:quantity,
            exectQty:0,
            timeStamp:Date.now(),
            user:user
        }
        // let trades=[]
        if(type==="MARKET"){
           let result= this._marketMatch(order);
           if(result.remainQty>0){
            console.log("order completed: "+result.exectQty+" "+"cancel order "+remain.remainQty)
           }
        }
        else{
            this._limitMatch(order)
        }
    }
    //execute order if it is market order
    //bids:[]descending
    // asks[]:ascendin
    // 1. type:buy||sell
    // 2.if buy start from ask array starting from index 0.
    // loop while order .remainingqty >0 && ans.length>0
    // buy minimumum ( order.remainQty&&ask[0].remaining qty)
    // update remaining and executdqty from both side
    
    _marketMatch(){
        if(side==="BUY"){
            let askArr=this.ask;
            let top=askArr[0];
            while(order.remainQty>0&&askArr.length>0){
                let orderFill=Math.min(order.remainQty,top.remainQty);
                order.exectQty=order.exectQty+orderFill;
                order.remainQty=order.remainQty-orderFill;
                top.exectQty=top.exectQty+orderFill;
                top.remainQty=top.remainQty-orderFill;
                //assume order.remaining
                if(top.remainQty<=0){
                    askArr.shift()
                }
            }
        }
        else{
            let bidArr=this.bids;
            let top=askArr[0];
            while(order.remainQty>0&&bidArr.length>0){
                let ordercomp=Math.min(order.remainQty,top.remainQty);
                order.remainQty-=ordercomp;
                order.exectQty+=ordercomp;
                top.remainQty-=ordercomp;
                top.exectQty+=ordercomp;
                if(top.remainQty<=0)bidArr.shift();
            }
        }

        return {order}
    }
    _limitMatch(order){
        if(order.side==="BUY"){
            let opp=this.ask;
            while(order.remainQty>0&& opp.length>0){
                let top=opp[0];
                if(order.price>=top.price){
                    let filledOrder=Math.min(order.remainQty,top.remainQty);
                    order.exectQty=order.exectQty+orderFill;
                order.remainQty=order.remainQty-orderFill;
                top.exectQty=top.exectQty+orderFill;
                top.remainQty=top.remainQty-orderFill;
                this.lastTradedPrice = top.price;
                if(top.remainQty<=0){
                    opp.shift()
                }
                }
            }
            if(order.remainQty>0){
                this.bids.push(order)
                this._sort("BUY")
            }
        }
    else{
        let opp=this.bids;
        while(order.remainQty>0&&opp.length>0){
            let top=opp[0];
            if(order.price<=top.price){
              let ordercomp=Math.min(order.remainQty,top.remainQty);
              order.remainQty-=ordercomp;
              order.exectQty+=ordercomp;
              top.remainQty-=ordercomp;
              top.exectQty+=ordercomp;
              if(top.remainQty<=0){
                opp.shift();
              }
            }
            if(order.remainQty>0){
                this.ask.push(order)
                this._sort("SELL");
            }
        }
    }
    }
    getBookSnapShot(){
        return {
            lastUpdated:Date.now(),
            bids:this.bids.map((o)=>[o.price,o.remainQty]),
            ask:this.ask.map((o)=>[o.price,o.remainQty])
        }
    }
}

//if a function or variable start with _(private)
// (agr _ se bnaega to voh hum mangee ki private hai classya var)
//let orderBook=new orderBook("BTCUSD")
let BTCUSDOrderBook=new OrderBook();

BTCUSDOrderBook.placeOrder("BUY","LIMIT","1506.00",20,"Vanshika")
BTCUSDOrderBook.placeOrder("BUY","LIMIT","1505.00",20,"Saloni")
BTCUSDOrderBook.placeOrder("BUY","LIMIT","1500.00",20,"Keshav")
console.log(BTCUSDOrderBook.getBookSnapShot());
BTCUSDOrderBook.placeOrder("SELL","LIMIT","1507.00",10,"Vanshika");
BTCUSDOrderBook.placeOrder("SELL","LIMIT","1508.00",10,"Saloni");
BTCUSDOrderBook.placeOrder("SELL","LIMIT","1509.00",10,"Keshav");

console.log(BTCUSDOrderBook.getBookSnapshot());
//fill as market maker

// BTCUSDOrderBook.bids.push({orderId:2,side:"BUY",type:"MARKET",price:100,quantity:10,timeStamp:Date.now(),user:"Vanshika"})
// BTCUSDOrderBook.bids.push({orderId:2,side:"BUY",type:"MARKET",price:99,quantity:10,timeStamp:Date.now(),user:"Saloni"})
// BTCUSDOrderBook.bids.push({orderId:2,side:"BUY",type:"MARKET",price:96,quantity:10,timeStamp:Date.now(),user:"Sneha"})
// BTCUSDOrderBook.bids.push({orderId:2,side:"BUY",type:"MARKET",price:98,quantity:10,timeStamp:Date.now(),user:"Keshav"})
// BTCUSDOrderBook.bids.push({orderId:2,side:"BUY",type:"MARKET",price:97,quantity:10,timeStamp:Date.now(),user:"Vivek"})

// BTCUSDOrderBook._sort("BUY")


// console.log(BTCUSDOrderBook.bids)
// BTCUSDOrderBook.ask.push({orderId:2,side:"BUY",type:"MARKET",price:100,quantity:10,timeStamp:Date.now(),user:"Vanshika"})
// BTCUSDOrderBook.ask.push({orderId:2,side:"BUY",type:"MARKET",price:99,quantity:10,timeStamp:Date.now(),user:"Saloni"})
// BTCUSDOrderBook.ask.push({orderId:2,side:"BUY",type:"MARKET",price:96,quantity:10,timeStamp:Date.now(),user:"Sneha"})
// BTCUSDOrderBook.ask.push({orderId:2,side:"BUY",type:"MARKET",price:98,quantity:10,timeStamp:Date.now(),user:"Keshav"})
// BTCUSDOrderBook.ask.push({orderId:2,side:"BUY",type:"MARKET",price:97,quantity:10,timeStamp:Date.now(),user:"Vivek"})
// BTCUSDOrderBook.placeOrder("BUY","MARKET",null,10,"Vanshika")
// console.log(BTCUSDOrderBook.getBookSnapShot());
// BTCUSDOrderBook._sort("SELL")
// console.log(BTCUSDOrderBook.ask)