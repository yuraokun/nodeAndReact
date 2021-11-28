// console.log(1235);

// const name = "oh really";

// console.log(name);

var http = require("http");
var url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;

var server = http.createServer(function (req, res) {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");

  const method = req.method.toLowerCase();

  const queryStringObj = parsedUrl.query;

  const headers = req.headers;

  const decoder = new StringDecoder("utf-8");
  let buffer = "";

  req.on("data", function (data) {
    buffer += decoder.write(data);
  });
  req.on("end", function () {
    buffer += decoder.end();

    res.end("honda\n");
    // console.log(path);
    // console.log(trimmedPath);
    // console.log(method);

    // console.log(queryStringObj);
    // console.log(headers);
    console.log(buffer);
  });
});

server.listen(8012);
