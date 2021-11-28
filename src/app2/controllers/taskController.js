const db = require("../models");

// create main Model
const Task = db.Task;

//1, create product

const addTask = async (req, res) => {
  console.log(req.body);
  let task = {
    userId: req.session.user.id,
    text: req.body.text,
  };
  task = await Task.create(task);
  res.status(201).send(task);
  console.log(task);
};

//2. get all products

const getTasks = async (req, res) => {
  let tasks = await Task.findAll({
    where: { userId: req.session.user.id },
    attributes: ["id", "text", "isDone"],
  });
  res.status(200).send(tasks);
};

//3. delete task
const deleteTask = async (req, res) => {
  let id = req.params.id;
  let result = await Task.destroy({ where: { id: id } });
  console.log(result);
  res
    .status(200)
    .json({ result: true, msg: `task of id ${id} has been deleted` });
};

//4. switch reminder state
const switchReminder = async (req, res) => {
  let id = req.params.id;
  console.log(req.body);
  let result = await Task.update(req.body, { where: { id: id } });
  if (result) {
    let updTask = await Task.findOne({ where: { id: id } });
    res.status(200).send(updTask);
  }
};

//.5 get one task
const getTask = async (req, res) => {
  let id = req.params.id;
  let task = await Task.findOne({ where: { id: id } });
  if (task) {
    res.status(200).send(task);
  } else {
    res.status(404).send("No Task Found");
  }
};

// const testQuery = async (req, res) => {
// const users = await sequelize.query("SELECT * FROM `tasks` ", {
//   type: QueryTypes.SELECT,
// });
// }

module.exports = {
  addTask,
  getTasks,
  getTask,
  deleteTask,
  switchReminder,
};
