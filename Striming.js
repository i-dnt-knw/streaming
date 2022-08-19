const fs = require('fs');
const http = require('http');
const server = http.createServer();

server.on('request',(req,res)=>{
  fs.readFile('my.txt',(err,data)=>{
    if(err) return console.err(err);
    res.end(data.toString())
  });
});

server.listen(5000,'127.0.0.1');


/***********
 * Old System Without Striming
***********/