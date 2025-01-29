
import { useState, useEffect } from "react";
import TaskModal from "./components/TaskModal";
import TaskColumn from "./components/TaskColumn";
import Sidebar from "./components/Sidebar";
import "./App.css";

const STORAGE_KEY = "taskManagementData";

const initialProjects = [
  {
    id: 1,
    name: "Freelance Project",
    tasks: {
      todo: [],
      inProgress: [],
      inReview: [],
      completed: [],
    },
  },
  {
    id: 2,
    name: "SBI Outsource",
    tasks: {
      todo: [],
      inProgress: [],
      inReview: [],
      completed: [],
    },
  },
  {
    id: 3,
    name: "HPCL Project 1",
    tasks: {
      todo: [],
      inProgress: [],
      inReview: [],
      completed: [],
    },
  },
];

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [projects, setProjects] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return initialProjects;
  });
  const [selectedProject, setSelectedProject] = useState(1);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const handleAddTask = (task) => {
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === selectedProject) {
          const updatedTasks = { ...project.tasks };
          Object.keys(updatedTasks).forEach((status) => {
            updatedTasks[status] = updatedTasks[status].filter(
              (t) => t.id !== task.id
            );
          });
          return {
            ...project,
            tasks: {
              ...updatedTasks,
              [task.status]: [...updatedTasks[task.status], task],
            },
          };
        }
        return project;
      })
    );
    setIsModalOpen(false);
  };

  const handleEditTask = (task) => {
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === selectedProject) {
          const updatedTasks = { ...project.tasks };
          Object.keys(updatedTasks).forEach((status) => {
            updatedTasks[status] = updatedTasks[status].filter(
              (t) => t.id !== task.id
            );
          });
          return {
            ...project,
            tasks: {
              ...updatedTasks,
              [task.status]: [...updatedTasks[task.status], task],
            },
          };
        }
        return project;
      })
    );
    setEditTask(null);
  };

  const handleAddProject = (name) => {
    const newProject = {
      id: Date.now(),
      name,
      tasks: {
        todo: [],
        inProgress: [],
        inReview: [],
        completed: [],
      },
    };
    setProjects((prev) => [...prev, newProject]);
  };

  const currentProject = projects.find((p) => p.id === selectedProject);

  return (
    <div className="app-container">
      <Sidebar
        projects={projects}
        selectedProject={selectedProject}
        onSelectProject={setSelectedProject}
        onAddProject={handleAddProject}
      />
      <main className="main-content">
        <h1 className="project-title">{currentProject?.name}</h1>
        <div className="board-container">
          <TaskColumn
            title="To Do"
            tasks={currentProject?.tasks.todo || []}
            onAdd={() => setIsModalOpen(true)}
            onEdit={setEditTask}
            color="blue"
            status="todo"
          />
          <TaskColumn
            title="In Progress"
            tasks={currentProject?.tasks.inProgress || []}
            onAdd={() => setIsModalOpen(true)}
            onEdit={setEditTask}
            color="pink"
            status="inProgress"
          />
          <TaskColumn
            title="In Review"
            tasks={currentProject?.tasks.inReview || []}
            onAdd={() => setIsModalOpen(true)}
            onEdit={setEditTask}
            color="lightblue"
            status="inReview"
          />
          <TaskColumn
            title="Completed"
            tasks={currentProject?.tasks.completed || []}
            onAdd={() => setIsModalOpen(true)}
            onEdit={setEditTask}
            color="green"
            status="completed"
          />
        </div>

        {(isModalOpen || editTask) && (
          <TaskModal
            task={editTask}
            onClose={() => {
              setIsModalOpen(false);
              setEditTask(null);
            }}
            onSubmit={editTask ? handleEditTask : handleAddTask}
          />
        )}
      </main>
    </div>
  );
}
