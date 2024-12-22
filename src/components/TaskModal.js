"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function TaskModal({ task, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    deadline: "",
    status: "todo",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData(task);
    }
  }, [task]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Please fill the task name";
    if (!formData.startDate) newErrors.startDate = "Please fill the start date";
    if (!formData.deadline)
      newErrors.deadline = "Please fill the deadline date";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        id: task?.id || Date.now(),
      });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{task ? "Edit task" : "Add new task"}</h2>
          <button onClick={onClose} className="close-button">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="taskName">Name of the Task</label>
            <input
              id="taskName"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className={errors.name ? "error" : ""}
            />
            {errors.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate">Start date</label>
              <input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }))
                }
                className={errors.startDate ? "error" : ""}
              />
              {errors.startDate && (
                <span className="error-message">{errors.startDate}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="deadline">Deadline</label>
              <input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, deadline: e.target.value }))
                }
                className={errors.deadline ? "error" : ""}
              />
              {errors.deadline && (
                <span className="error-message">{errors.deadline}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, status: e.target.value }))
              }
            >
              <option value="todo">To Do</option>
              <option value="inProgress">In Progress</option>
              <option value="inReview">In Review</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {task ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
