const http = require("http");

const { readFileSync } = require("fs");
const basicStyle = readFileSync("./html/style.css");
const favicon = readFileSync("./html/favicon.ico");
const indexJs = readFileSync("./html/index.js");

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    // get all files
    const homePage = readFileSync("./html/index.html");
    // res.writeHead(200, { "content-type": "text/plain" });
    res.writeHead(200, { "content-type": "text/html" });
    res.end(homePage);
  } else if (req.url == "/about") {
    // get all files
    const aboutPage = readFileSync("./html/about.html");
    res.writeHead(200, { "content-type": "text/html" });
    res.end(aboutPage);
  } else if (req.url == "/style.css") {
    res.writeHead(200, { "content-type": "text/css" });
    res.write(basicStyle);
    res.end();
  } else if (req.url == "/favicon.ico") {
    res.writeHead(200, { "content-type": "image/vnd.microsoft.icon" });
    res.write(favicon);
    res.end();
  } else if (req.url == "/index.js") {
    res.writeHead(200, { "content-type": "text/javascript" });
    res.write(indexJs);
    res.end();
  } else {
    res.writeHead(400, { "content-type": "text/html" });
    res.end("<h1>Page Not Found</h1>");
  }
});

server.listen(80);
