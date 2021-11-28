const express = require("express");
const path = require("path");
const auth = require("registry-auth-token");
const data = require("./data");

// middleware
const { logger, authorize } = require("./functions");

const app = express();

// app.use("/api", logger);

// use global middleware
// app.use("/api", [authorize, logger]);

// parse form data
app.use(express.urlencoded({ extended: false }));

// static assets
app.use(express.static("./public"));

// parse json
app.use(express.json());

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "./html/index.html"));
//   // res.status(200).send("home page");
// });

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "./html/about.html"));
  console.log(12);
  // res.status(200).send("about page");
});

app.post("/login", (req, res) => {
  const { name } = req.body;
  console.log(req.body);

  if (name) {
    return res.status(200).send(`welcome ${name}`);
  }

  return res.send("Please provide credential");
});

// router products api
const products = require("./routes/products");
app.use("/api/products", products);

const logger2 = (req, res, next) => {
  console.log(1234);
  next();
};
app.get("/api/middlewareTest", (req, res) => {
  console.log(req);
  res.json({ msg: "middleware test" });
});
app.get("/api/middlewareTest2", (req, res) => {
  res.json({ msg: "middleware test2" });
});
app.get("/api2/middlewareTest", logger2, (req, res) => {
  res.json({ msg: "middleware test3" });
});

// page not found page
app.all("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(80, () => {
  console.log("hey");
});

//app.get
//app.post
//app.put
//app.delete
//app.all
//app.use
//app.listen
