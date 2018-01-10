var express=require('express');
var app=express();
var path=require('path');
var sample=require("./data.js").sample;
app.use(express.static('./public'));


app.get('/',(req,res)=>{
    res.status(200);
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/match/:pattern',(req,res)=>{
    res.status(200);
    var pattern=req.params.pattern;
    pattern=pattern.toLowerCase();
    var result=[];
    sample.forEach((element)=>{
        if(element.toLocaleLowerCase().startsWith(pattern)){
            result.push(element);
        }
    })
    res.send(JSON.stringify(result));
})

app.listen(3000,()=>{
    console.log("server started");
});