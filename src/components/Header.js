import { Search, Bell } from "lucide-react";

export default function Header({ projectName }) {
  return (
    <header className="app-header">
      <h1 className="project-title">{projectName}</h1>
      <div className="header-actions">
        <div className="search-container">
          <Search size={20} />
          <input type="text" placeholder="Search" className="search-input" />
        </div>
        <button className="notification-btn">
          <Bell size={20} />
        </button>
        <button className="user-avatar">
          <img src="/placeholder-user.jpg" alt="User avatar" />
        </button>
      </div>
    </header>
  );
}
