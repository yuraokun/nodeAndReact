require("dotenv").config();
const { sequelize, User, Task } = require("./models");
const express = require("express");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const saltRounds = 10;
// require("crypto").randomBytes(64).toString("hex");
// const cors = require("cors");
// const path = require("path");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res
      .status(401)
      .json({ result: false, err: "you are not authenticated" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res
        .status(401)
        .json({ result: false, err: "you are not authenticated" });
    req.user = user;
    next();
  });
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: true }));

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

      const accessToken = jwt.sign(
        { id: user.id, name: user.name, role: user.role, email: user.email },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.status(200).json({
        result: true,
        msg: "you are logged in",
        user: user,
        accessToken,
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

app.get("/tasks", authenticateToken, async (req, res) => {
  // return res.json(req.user);
  try {
    const tasks = await Task.findAll({
      where: { userId: req.user.id },
      include: ["user"],
    });
    return res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.listen({ port: 80 }, async () => {
  // ここでmodelsのディレクトリの中にあるModelのテーブルを作成する
  //　{alter: true}にすることによってテーブルの定義を変更することができる
  // await sequelize.sync({ alter: true });
  await sequelize.authenticate();
  console.log("started listening on port 80");
});
