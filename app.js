var express=require('express');
var app=express();
var path=require('path');
var fs=require('fs');
app.use(express.static('./public'));
var cors = require('cors')

app.use(cors());

app.get('/',(req,res)=>{
    res.status(200);
    res.sendFile(path.join(__dirname + '/index.html'));
})


app.get('/users/:name',(req,res)=>{
    res.status(200);
    var pageNo = parseInt(req.query.pageNo);
    var size = parseInt(req.query.size);
    var skip=size*pageNo;
    fs.readFile('./data.json', 'utf8', function (err,data) {
        data = JSON.parse(data);
        res.status(200);
        var name=req.params.name.toLowerCase();
        var result=[];
        var count=0;
        data.forEach((element)=>{
            if(element.first_name.toLocaleLowerCase().startsWith(name)){
                if(count>=skip && count<skip+size)
                result.push(element);
                count++;
            }
        })
    res.send(JSON.stringify(result));
      });
})

app.listen(3000,()=>{
    console.log("server started");
});