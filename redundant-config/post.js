'use strict';

const fs = require('fs');
const http = require('http');

const postData = JSON.stringify({
  data: fs.readFileSync('./body.txt').toString()
});

function post() {
  const req = http.request({
    method: 'POST',
    host: 'localhost',
    port: '7004',
    path: '/memory',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  });

  req.write(postData);

  req.end();

  req.on('error', function (err) {
    console.log(12333, err);
  });
}

setInterval(post, 1000);