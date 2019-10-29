let http = require('http');
let url = require('url');
let fs = require('fs');

http
  .createServer((req, res) => {
    let site = url.parse(req.url, true);
    let filename = '';

    if (site.pathname === '/') {
      filename = './index.html';
    } else if (site.pathname === '/about' || site.pathname === '/contact-me') {
      filename = `.${site.pathname}.html`;
    }

    fs.readFile(filename, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        return res.end('Page not found - 404');
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
      return res.end();
    });
  })
  .listen(9000);
