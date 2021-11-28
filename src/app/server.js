const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const corOptions = {
  origin: "http://localhost:8099",
};

// static assets
app.use(express.static("./resources/build"));

// middleware
app.use(cors(corOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// routers
const router = require("./routes/productRouter");
app.use("/api/products", router);

const taskRouter = require("./routes/taskRouter");
app.use("/api/tasks", taskRouter);

//これを追加（全てをindex.htmlにリダイレクト。いわゆるrewrite設定）
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "resources", "build", "index.html"));
});

//testing api
// app.get("/", (req, res) => {
//   res.json({ message: "hellooooo" });
// });

// port
const PORT = process.env.PORT || 80;

// server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
