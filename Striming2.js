/***********
 * new System with Striming
***********/
const fs = require('fs');
const http = require('http');
const server = http.createServer();

server.on('request',(req,res)=>{
  let rStream = fs.createReadStream('ok.mp4');
  rStream.on('data',(chunkdata)=>{
    res.write(chunkdata);
  });
  rStream.on('end',()=> res.end());
});

server.listen(5000,'127.0.0.1');