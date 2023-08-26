const express = require('express')
const bodyparser = require('body-parser')

const app = express()
app.use(express.json())

app.set('view engine','ejs')
app.use(bodyparser.urlencoded({extended:false}));
 
app.use(express.static('public'))


app.get("/",async(req,res)=>{
    try{
        let limit = []
        res.render("task", {data: limit})
    }
    catch(err){
        console.log(err);
    }
    
})

app.post("/",async(req,res)=>{
    try{
        let token = req.body.token

    if(token===undefined) token="0x7213a321F1855CF1779f42c0CD85d3D95291D34C"
    console.log(token);
    let url ="https://api.dexscreener.com/latest/dex/tokens/"+token;

    let response = await fetch(url);
    const data= await response.json();
    const arrData = [data];
    let newdata = arrData[0].pairs

    let limit = []
    if (newdata !== null && newdata !== undefined){
    for(let i=0;i<Math.min(10,newdata.length);i++){
        limit.push(newdata[i])
    }
    }   

    limit.sort((a, b) => parseFloat(b.priceUsd) - parseFloat(a.priceUsd));
    res.render("task", {data: limit})
    }
    catch(err){
        console.log(err);
    }
})

let port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log("App Started on...");
    console.log(port);
})
