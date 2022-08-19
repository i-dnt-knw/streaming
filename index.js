const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'./index.html'));
})
app.get('/video',(req,res)=>{
  let range = req.headers.range;
  if(!range){
    res.status(400).send('video not found');
  }
  let videoPath = 'What_is_nginx.mp4';
  let videoSize = fs.statSync('What_is_nginx.mp4').size;
  let CHUNK_SIZE = 10 ** 6;
  let start = Number(range.replace(/\D/g,''));
  let end = Math.min(start + CHUNK_SIZE, videoSize -1);
  let contentLength = end - start + 1;
  let headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "content-Type": "video/mp4"
  }
  res.writeHead(206,headers);
  let videoStream = fs.createReadStream(videoPath,{start,end});
  videoStream.pipe(res);
})

app.listen(5000);