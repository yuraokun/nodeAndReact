import Header from "./Header";
import Tasks from "./Tasks";
import { useState, useEffect } from "react";
import AddTask from "./AddTask";
import axios from "axios";

const TaskMain = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasks = await fetchTasks();
      setTasks(tasks);
    };

    getTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get("/api/tasks/allTasks");

    if (res.status === 200) {
      console.log(res);
      return res.data;
      // setTasks([...res.data]);
    }
  };

  // const fetchTask = async (id) => {
  //   const res = await axios.get(`/api/tasks/${id}`);

  //   if (res.status === 200) {
  //     console.log(res);
  //     return res.data;
  //     // setTasks([...res.data]);
  //   }
  // };

  // Delete Task
  const deleteTask = async (id) => {
    const res = await axios.delete(`/api/tasks/${id}`);
    if (res.status === 200) {
      console.log(res);
      setTasks(tasks.filter((task) => task.id !== id));
    }

    console.log("delete", id);
  };

  const toggleReminer = async (id) => {
    const task = await axios.get(`/api/tasks/${id}`);
    const updTask = {
      ...task.data,
      reminder: !task.data.reminder,
    };
    console.log(updTask);
    const res = await axios.put(`/api/tasks/switchReminder/${id}`, updTask);
    if (res.status === 200) {
      console.log(res);
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, reminder: res.data.reminder } : task
        )
      );
    }
  };

  const addTask = async (task) => {
    console.log(task);
    const res = await axios.post("/api/tasks/addTask", { ...task });

    if (res.status === 201) {
      console.log(res);
      setTasks([...tasks, res.data]);
    }
    // const id = Date.now().toString() + Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...task };
  };
  return (
    <div>
      <Header
        name="Task Tracker"
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask}></AddTask>}
      {/* <h1>Heellooo wooorld</h1> */}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminer} />
      ) : (
        <h3>No Tasks at the moment</h3>
      )}
    </div>
  );
};

export default TaskMain;
