const http = require("http");
const fs = require("fs");

const server = http.createServer();

server.on("request", (req, res) => {
  // const fileStream = fs.createReadStream("./files/texts2/test2.txt", "utf8");
  // fileStream.on("open", () => {});
  // fileStream.on("error", (err) => {
  //   res.end(err);
  // });
  res.end("Honda");
});

server.listen(80);
