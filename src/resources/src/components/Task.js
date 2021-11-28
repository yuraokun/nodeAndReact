import { Link } from "react-router-dom";

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <Link to={`/${task.id}`}>{task.text}</Link>
      <span onClick={() => onDelete(task.id)}>x</span>
    </div>
  );
};

export default Task;
