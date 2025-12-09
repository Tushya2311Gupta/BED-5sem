const express=require('express');
const { default: mongoose } = require('mongoose');
const app=express();
app.use(express.json());

// Sample in-memory data store  
let items=[
    {id:1,name:'Item 1'},
    {id:2,name:'Item 2'},
    {id:3,name:'Item 3'}
];
// Get all items
app.get('/items',(req,res)=>{
    res.json(items);
});
// Get item by ID
app.get('/items/:id',(req,res)=>{
    const itemId=parseInt(req.params.id);
    const item=items.find(i=>i.id===itemId);
    if(item){
        res.json(item);
    }else{
        res.status(404).send('Item not found');
    }
});
// Create new item
app.post('/items',(req,res)=>{
    const newItem={
        id:items.length+1,
        name:req.body.name
    }
}); 
    items.push(newItem);
    res.status(201).json(newItem);
// Update item by ID
app.put('/items/:id',(req,res)=>{
    const itemId=parseInt(req.params.id);
    const item=items.find(i=>i.id===itemId);
    if(item){
        item.name=req.body.name;
        res.json(item);
    }else{
        res.status(404).send('Item not found');
    }
});
// Delete item by ID
app.delete('/items/:id',(req,res)=>{
    const itemId=parseInt(req.params.id);
    const itemIndex=items.findIndex(i=>i.id===itemId);
    if(itemIndex!==-1){
        items.splice(itemIndex,1);
        res.status(204).send();
    }
    else{
        res.status(404).send('Item not found');
    }
});
mongoose.connect('mongodb://localhost:27017/test',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('Connected to MongoDB');
}).catch(err=>{
    console.error('Failed to connect to MongoDB',err);
});
app.listen(3000,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});