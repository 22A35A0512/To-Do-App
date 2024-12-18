import React, { useState, useEffect } from "react";
import "./App.css"; // Import the CSS file

function App() {
  const [task, setTask] = useState(""); // State for the input field
  const [tasks, setTasks] = useState([]); // State for the tasks list

  // Load tasks from localStorage when the app starts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever the tasks list changes
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // Add a new task
  const addTask = () => {
    if (task.trim() === "") {
      alert("Task cannot be empty!");
      return;
    }
    const newTask = {
      id: Date.now(), // Ensure each task has a unique ID
      text: task.trim(),
      completed: false,
    };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks)); // Sync with localStorage
    setTask(""); // Clear input field
  };

  // Delete a specific task
  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks)); // Sync with localStorage
  };

  // Toggle task completion
  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Sync with localStorage
  };

  return (
    <div className="app-container">
      <h1 className="title">To-Do App</h1>
      <div className="input-section">
        <input
          type="text"
          value={task}
          placeholder="Enter a task..."
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((t) => (
          <li key={t.id} className={t.completed ? "completed" : ""}>
            <span
              onClick={() => toggleTaskCompletion(t.id)}
              style={{ textDecoration: t.completed ? "line-through" : "none" }}
            >
              {t.text}
            </span>
            <button
              className="delete-btn"
              onClick={() => deleteTask(t.id)} // Use the unique id to delete
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
