const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.url);

  res.end();
});

const port = 7070;

server.listen(port, (err) => {
  if(err) {
    console.log(err);

    return;
  }

  console.log('Server is listening to ' + port);
});

