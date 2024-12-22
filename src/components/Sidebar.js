import { useState } from "react";
import { Plus } from "lucide-react";

export default function Sidebar({
  projects,
  selectedProject,
  onSelectProject,
  onAddProject,
}) {
  const [newProjectName, setNewProjectName] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newProjectName.trim()) {
      onAddProject(newProjectName.trim());
      setNewProjectName("");
      setIsAdding(false);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <svg
          className="menu-icon"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6H20M4 12H20M4 18H20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <h2 className="sidebar-title">Task boards</h2>
      </div>
      <ul className="project-list">
        {projects.map((project) => (
          <li
            key={project.id}
            className={`project-item ${
              selectedProject === project.id ? "active" : ""
            }`}
            onClick={() => onSelectProject(project.id)}
          >
            {project.name}
          </li>
        ))}
      </ul>
      {isAdding ? (
        <form onSubmit={handleSubmit} className="add-project-form">
          <input
            type="text"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="Project name"
            className="add-project-input"
            autoFocus
          />
          <div className="add-project-actions">
            <button type="submit" className="btn-primary">
              Add
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button className="add-project-btn" onClick={() => setIsAdding(true)}>
          <Plus size={16} />
          Add new Project
        </button>
      )}
    </div>
  );
}
