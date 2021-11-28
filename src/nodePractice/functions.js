const sayMsg = (name) => {
  console.log(`Hello ${name}`);
};

// middleware
const logger = (req, res, next) => {
  const method = req.method;
  console.log(method, req.query);
  next();
};

const authorize = (req, res, next) => {
  const { user } = req.query;

  if (user == "honda") {
    req.user = { name: "honda", id: 1 };
    console.log("authorize!!!");
    next();
  } else {
    res.status(401).send("Unauthorized..");
  }
};

module.exports = { sayMsg, logger, authorize };
