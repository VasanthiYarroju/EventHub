// src/components/admin/AdminHeader.js
import React from 'react';
import { LogOut } from 'lucide-react';
import NotificationBell from './NotificationBell';
import ThemeSwitcher from './ThemeSwitcher';

const AdminHeader = ({ onLogout, newNotificationsCount, notifications, onMarkNotificationsRead, theme, toggleTheme }) => {
  return (
    <header className="admin-header">
      <h1>Admin Dashboard</h1>
      <div className="admin-header-right">
        <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
        <NotificationBell
          count={newNotificationsCount}
          notifications={notifications}
          onMarkAllAsRead={onMarkNotificationsRead}
        />
        <button onClick={onLogout} className="logout-btn">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;