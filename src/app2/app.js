require("dotenv").config();
const { sequelize, User, Task } = require("./models");
const express = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const cors = require("cors");
const path = require("path");

const expressSession = require("express-session");
const SessionStore = require("express-session-sequelize")(expressSession.Store);
const cookieParser = require("cookie-parser");

const sequelizeSessionStore = new SessionStore({
  db: sequelize,
});

const app = express();
app.use(cookieParser());
app.use(
  expressSession({
    secret: "keep it secret, keep it safe.",
    store: sequelizeSessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// const jwt = require("jsonwebtoken");

// require("crypto").randomBytes(64).toString("hex");
// const cors = require("cors");
// const path = require("path");

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (token == null)
//     return res
//       .status(401)
//       .json({ result: false, err: "you are not authenticated" });

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err)
//       return res
//         .status(401)
//         .json({ result: false, err: "you are not authenticated" });
//     req.user = user;
//     next();
//   });
// };

function viewCount(req, res, next) {
  if (req.session.viewCount) {
    req.session.viewCount++;
  } else {
    req.session.viewCount = 1;
  }
  console.log(req.session);
  next();
}

app.use(viewCount);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: true }));

// static assets
app.use(express.static("./resources/build"));
const taskRouter = require("./routes/taskRouter");
app.use("/api/tasks", taskRouter);

app.get("/viewCount", (req, res) => {
  res
    .status(200)
    .send(`<h1>You have visited this site ${req.session.viewCount} times</h1>`);
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  bcrypt.hash(password, saltRounds, async (err, hash) => {
    // Store hash in your password DB.
    try {
      const user = await User.create({ email, password: hash });
      return res.status(201).json(user);
    } catch (err) {
      console.log("err occured");
      return res.status(500).json(err);
    }
  });
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findOne({
      where: { id },
      include: ["tasks"],
    });

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.get("/isLoggedIn", async (req, res) => {
  if (req.session.user) {
    res.status(200).json({ result: true, user: req.session.user });
  } else {
    res.status(200).json({ result: false });
  }
});

app.get("/logout", async (req, res) => {
  if (req.session.user) {
    delete req.session.user;
    res.status(200).json({ result: true });
  } else {
    res.status(200).json({ result: false });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      res.status(400).json({ result: false, err: "bad account credential..." });
    }

    bcrypt.compare(password, user.password, async (err, result) => {
      if (!result) {
        res
          .status(400)
          .json({ result: false, err: "bad account credential..." });
      }
      req.session.user = user;
      res.status(200).json({
        result: true,
        msg: "you are logged in",
        user: user,
      });
    });
  } catch (err) {
    console.log("err occured");
    return res.status(500).json(err);
  }
});

app.post("/task/create", async (req, res) => {
  const { userId, text } = req.body;

  try {
    const user = await User.findOne({ where: { id: userId } });

    const task = await Task.create({ userId, text: text });

    return res.status(201).json({ result: true, newTask: task });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.get("/tasks", async (req, res) => {
  // return res.json(req.user);
  // console.log(req.session);
  try {
    const tasks = await Task.findAll({
      include: ["user"],
    });
    return res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//これを追加（全てをindex.htmlにリダイレクト。いわゆるrewrite設定）
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "resources", "build", "index.html"));
});

app.listen({ port: 80 }, async () => {
  // ここでmodelsのディレクトリの中にあるModelのテーブルを作成する
  //　{alter: true}にすることによってテーブルの定義を変更することができる
  // await sequelize.sync({ alter: true });
  await sequelize.authenticate();
  console.log("started listening on port 80");
});
