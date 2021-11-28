const express = require("express");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const SessionStore = require("express-session-sequelize")(expressSession.Store);
const Sequelize = require("sequelize");
const myDatabase = new Sequelize("testdb", "testuser", "1234", {
  host: "db",
  dialect: "mysql",
});
const sequelizeSessionStore = new SessionStore({
  db: myDatabase,
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

app.use([middleware1, middleware2, errorHandler]);

function middleware1(req, res, next) {
  console.log("this is middlware1");
  next();
}
function middleware2(req, res, next) {
  console.log("this is middlware2");

  next();
}

function errorHandler(err, req, res, next) {
  next();
}

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.listen(80);
