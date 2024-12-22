import { Plus } from "lucide-react";

const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
};

const getColumnTitle = (status) => {
  switch (status) {
    case "todo":
      return "To Do";
    case "inProgress":
      return "In Progress";
    case "inReview":
      return "In Review";
    case "completed":
      return "Completed";
    default:
      return status;
  }
};

export default function TaskColumn({
  title,
  tasks,
  onAdd,
  onEdit,
  color,
  status,
}) {
  return (
    <div className={`column ${color}`}>
      <div className="column-header">
        <div className="status-badge">
          <span className="status-dot" />
          <span className="status-text">{getColumnTitle(status)}</span>
        </div>
      </div>

      <div className="tasks-container">
        {tasks.map((task) => (
          <div key={task.id} className="task-card" onClick={() => onEdit(task)}>
            <h3 className="task-title">{task.name}</h3>
            <div className="task-dates">
              <div className="date-group">
                <span className="date-label">Start date</span>
                <span className="date-value">{formatDate(task.startDate)}</span>
              </div>
              <div className="date-group">
                <span className="date-label">Deadline</span>
                <span className="date-value">{formatDate(task.deadline)}</span>
              </div>
            </div>
          </div>
        ))}

        <button className="add-task-btn" onClick={onAdd}>
          <Plus size={16} />
          Add new
        </button>
      </div>
    </div>
  );
}
