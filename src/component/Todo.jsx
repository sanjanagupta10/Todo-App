import React, { useState } from "react";
import "./Todo.css";

function Todo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  // Add or Update Task
  const handleAddOrUpdate = () => {
    if (task.trim() === "") return;

    if (editIndex >= 0) {
      // Update task
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = task;
      setTasks(updatedTasks);
      setEditIndex(-1); // reset edit mode
    } else {
      // Add new task
      setTasks([...tasks, task]);
    }
    setTask("");
  };

  // Delete Task
  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
    if (editIndex === index) setEditIndex(-1); // cancel edit if same task
  };

  // Edit Task
  const handleEdit = (index) => {
    setTask(tasks[index]);
    setEditIndex(index);
  };

  return (
    <div className="todo-container">
      <h2>My To-Do List</h2>

      <input
        className="todo-input"
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task..."
      />
      <button className="todo-btn" onClick={handleAddOrUpdate}>
        {editIndex >= 0 ? "Update" : "Add"}
      </button>

      <ul className="todo-list">
        {tasks.map((t, i) => (
          <li key={i} className="todo-item">
            {t}
            <div className="todo-actions">
              <button className="edit-btn" onClick={() => handleEdit(i)}>✏️</button>
              <button className="delete-btn" onClick={() => handleDelete(i)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
