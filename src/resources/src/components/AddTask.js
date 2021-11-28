import { useState } from "react";

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      alert("Please add a task");
    }

    onAdd({ text });
    setText("");
  };

  return (
    <form className="addTaskForm" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="Add Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <button type="submit">submit</button>
    </form>
  );
};

export default AddTask;
